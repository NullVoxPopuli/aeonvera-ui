import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  session: Ember.inject.service(),

  // passed in
  path: '',
  params: '',
  model: null,
  kind: '',
  relationships: '',

  // overrides modelAttributes
  fields: [],

  downloadLink: computed('selectedAttributes', {
    get(key) {
      let path = this.get('path');
      let selectedAttributes = this.get('selectedAttributes').mapBy('name');
      let params = this.get('params');
      let queryParams = Ember.isBlank(params) ? '' : Ember.$.param(params);
      let fields = `fields=${selectedAttributes.join(',')}&${queryParams}`;

      return `${path}${fields}`;
    }
  }),

  fileName: computed('kind', {
    get() {
      return this.get('kind') + '.csv';
    }
  }),

  modelName: computed('kind', {
    get(key) {
      let noDashes = this.get('kind').replace('-', ' ');
      return noDashes.pluralize();
    }
  }),

  modelType: computed('kind', {
    get(key) {
      let kind = this.get('kind');
      let model = this.store.modelFor(kind);

      return model;
    }
  }),

  selectedAttributes: computed('_modelAttributes.@each.included', {
    get(key) {
      return this.get('modelAttributes').rejectBy('included', false);
    }
  }),
  _modelAttributes: [],
  modelAttributes: computed('modelType', {
    get(key) {
      const fields = this.get('fields');

      if (Ember.isPresent(fields)) {
        return fields;
      }

      let modelType = this.get('modelType');
      let modelAttributes = this.get('_modelAttributes');
      if (Ember.isBlank(modelAttributes)) {
        modelAttributes = this._attributesForModelType(modelType, true);

        let relationships = this.get('modelRelationships');
        relationships.forEach(relationship => {
          let modelType = this.store.modelFor(relationship);
          let attributes = this._attributesForModelType(modelType, false, `${relationship}.`);
          attributes.forEach(attribute => {
            modelAttributes.push(attribute);
          });
        });

        this.set('_modelAttributes', modelAttributes);
      }

      return modelAttributes;
    }
  }),

  modelRelationships: computed('modelType', {
    get(key) {
      let modelType = this.get('modelType');
      let allowedRelationships = this.get('relationships').split(',');
      let relationshipData = Ember.get(modelType, 'relationships');

      // return relationshipData.map(r => r.name)
      // TODO: is there a fancy ES6 way to do this?
      // This is a MayWithDefault object :-(
      let relationships = [];
      relationshipData.forEach((meta, relationship) => {
        if (allowedRelationships.contains(relationship)) {
          relationships.push(relationship);
        }
      });

      return relationships;
    }
  }),

  modelRelationshipsAttributeMap: computed('modelRelationships', {
    get(key) {
      let relationships = this.get('modelRelationships');
      let result = {};

      relationships.forEach(relationship => {
        let modelType = this.store.modelFor(relationship);
        result[relationship] = this._attributesForModelType(modelType, false, `${relationship}.`);
      });

      return result;
    }
  }),

  _attributesForModelType(modelType, included = false, prefix = '') {
    let attributeData = Ember.get(modelType, 'attributes');

    // return attributeData.map((meta, attr) => attr);
    // TODO: is there a fancy ES6 way to do this?
    // This is a MayWithDefault object :-(
    let attributes = [];
    attributeData.forEach((meta, attribute) => {
      attributes.pushObject({ name: `${prefix}${attribute}`, included: included });
    });

    return attributes;
  },

  _triggerDownload(response) {
    let encoded = encodeURIComponent(response);
    let fileName = this.get('fileName');
    let data = `data:application/csv;filename=${fileName};charset=UTF-8,${encoded}`;

    let link = document.createElement('a');
    link.download = fileName;
    link.href = data;
    link.click();
  },

  actions: {
    download() {
      let path = this.get('downloadLink');

      // authenticated request, requires token
      let authToken = this.get('session.data.authenticated.token');

      Ember.$.ajax({
        url: path,
        type: 'GET',
        beforeSend(xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
        }
      }).then(data => this._triggerDownload(data));
    }
  }
});
