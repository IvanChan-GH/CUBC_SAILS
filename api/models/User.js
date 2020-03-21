/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    username: {
      type: "string",
      unique: true,
      required: true
    },

    password: {
      type: "string",
      required: true
    },

    avatarPath: {
      type: 'string'
    },
    
    avatar: {
      type: 'string'
    },

    staffID: {
      type: 'string'
    },

    email: {
      type: 'string'
    },

    tel: {
      type: 'string'
    },


    role: {
      type: 'string'
    },
    
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    bookboardgame: {
      collection: 'Boardgame',
      via: 'bgbookby'
    },

    bookboardgamehist: {
      collection: 'Boardgame',
      via: 'bgbookbyhist'
    },


    bookbook: {
      collection: 'Book',
      via: 'bkbookby'
    },


    bookmaterial: {
      collection: 'Material',
      via: 'matbookby'
    },

    borrowboardgame: {
      collection: 'Boardgame',
      via: 'bgborrowby'
    },

    borrowbook: {
      collection: 'Book',
      via: 'bkborrowby'
    },
   
    borrowmaterial: {
      collection: 'Material',
      via: 'matborrowby'
    },
  },
};

