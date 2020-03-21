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
      name: {
        type: "string"
      },

      type:{
        type: "string"
      },

      location:{
        type: "string"
      },

      avatar:{
        type: "string"
      },
      isbooked: {
        type: "boolean"
      },

      isborrowed: {
        type: "boolean"
      },

      remark: {
        type: "string"
      },
      

      duedate: {
        type: "number"
      },
  
      //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
      //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
      //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
  
  
      //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
      //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
      //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
      bgbookby: {
        collection: 'User',
        via: 'bookboardgame'
      },
      
      bgbookbyhist: {
        collection: 'User',
        via: 'bookboardgamehist'
      },

      bgborrowby: {
        collection: 'User',
        via: 'borrowboardgame'
      },
    },
  };
  
  