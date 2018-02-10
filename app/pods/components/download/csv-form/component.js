import $ from 'jquery';
import { isBlank, isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  session: service(),

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
      const path = this.get('path');
      const selectedAttributes = this.get('selectedAttributes').mapBy('name');
      const params = this.get('params');
      const queryParams = isBlank(params) ? '' : $.param(params);
      const fields = `fields=${selectedAttributes.join(',')}&${queryParams}`;

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
      const noDashes = this.get('kind').replace('-', ' ');

      return noDashes.pluralize();
    }
  }),

  modelType: computed('kind', {
    get(key) {
      const kind = this.get('kind');
      const model = this.store.modelFor(kind);

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

      if (isPresent(fields)) {
        return fields;
      }

      const modelType = this.get('modelType');
      let modelAttributes = this.get('_modelAttributes');

      if (isBlank(modelAttributes)) {
        modelAttributes = this._attributesForModelType(modelType, true);

        const relationships = this.get('modelRelationships');

        relationships.forEach(relationship => {
          const modelType = this.store.modelFor(relationship);
          const attributes = this._attributesForModelType(modelType, false, `${relationship}.`);

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
      const modelType = this.get('modelType');
      const allowedRelationships = this.get('relationships').split(',');
      const relationshipData = get(modelType, 'relationships');

      // return relationshipData.map(r => r.name)
      // TODO: is there a fancy ES6 way to do this?
      // This is a MayWithDefault object :-(
      const relationships = [];

      relationshipData.forEach((meta, relationship) => {
        if (allowedRelationships.includes(relationship)) {
          relationships.push(relationship);
        }
      });

      return relationships;
    }
  }),

  modelRelationshipsAttributeMap: computed('modelRelationships', {
    get(key) {
      const relationships = this.get('modelRelationships');
      const result = {};

      relationships.forEach(relationship => {
        const modelType = this.store.modelFor(relationship);

        result[relationship] = this._attributesForModelType(modelType, false, `${relationship}.`);
      });

      return result;
    }
  }),

  _attributesForModelType(modelType, included = false, prefix = '') {
    const attributeData = get(modelType, 'attributes');

    // return attributeData.map((meta, attr) => attr);
    // TODO: is there a fancy ES6 way to do this?
    // This is a MayWithDefault object :-(
    const attributes = [];

    attributeData.forEach((meta, attribute) => {
      attributes.pushObject({ name: `${prefix}${attribute}`, included: included });
    });

    return attributes;
  },

  _triggerDownload(response) {
    const encoded = encodeURIComponent(response);
    const fileName = this.get('fileName');
    const data = `data:application/csv;filename=${fileName};charset=UTF-8,${encoded}`;

    const link = document.createElement('a');

    link.download = fileName;
    link.href = data;
    link.click();
  },

  actions: {
    download() {
      const path = this.get('downloadLink');

      // authenticated request, requires token
      const authToken = this.get('session.data.authenticated.token');

      $.ajax({
        url: path,
        type: 'GET',
        beforeSend(xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
        }
      }).then(data => this._triggerDownload(data));
    }
  }
});
