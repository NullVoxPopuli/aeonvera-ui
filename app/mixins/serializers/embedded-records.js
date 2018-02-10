import Mixin from '@ember/object/mixin';
import DS from 'ember-data';

export default Mixin.create(DS.EmbeddedRecordsMixin, {
  // fix: move array to the data section
  //
  _serializeEmbeddedBelongsTo(snapshot, json, relationship) {
    this._super(snapshot, json, relationship);
    this._belongsToEmbedded(json, relationship);
  },

  _serializeEmbeddedHasMany(snapshot, json, relationship) {
    this._super(snapshot, json, relationship);
    this._hasManyDataEmbedded(json, relationship);
  },

  _belongsToEmbedded(json, relationship) {
    if (relationship.kind !== 'belongsTo') {
      return;
    }

    const key = relationship.key.dasherize();
    const jsonForKey = json[key] || {};
    const data = jsonForKey.data;

    delete json[key];
    if (!json.relationships) {
      json.relationships = {};
    }

    json.relationships[key] = {
      data
    };
  },

  _hasManyDataEmbedded(json, relationship) {
    if (relationship.kind !== 'hasMany') {
      return;
    }

    const key = relationship.key.dasherize();
    const data = json[key].mapBy('data');

    delete json[key];
    if (!json.relationships) {
      json.relationships = {};
    }

    json.relationships[key] = {
      data
    };
  }
});
