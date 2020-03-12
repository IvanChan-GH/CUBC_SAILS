/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  sails.bcrypt = require ('bcryptjs');
  const saltRounds = 10;

  User.destroy ({});
  Book.destroy ({});
  Boardgame.destroy ({});
  Present.destroy ({});
  Material.destroy ({});

  if ((await Book.count ()) == 0) {
    await Book.createEach ([
      {
        id: 1,
        name: 'The Railway Children',
        pubyear: 2017,
        author: 'Edith Nesbit',
        location: 'room101',
        avatar: '',
        bookstatus: false,
        borrowstatus: false,
      },
      {
        id: 2,
        name: 'Inland: A Novel',
        pubyear: 2019,
        author: 'Téa Obreht',
        location: 'room222',
        avatar: '',
        bookstatus: false,
        borrowstatus: true,
      },
      {
        id: 3,
        name: '72 hours',
        pubyear: 2019,
        author: 'Téa Obreht',
        location: 'room222',
        avatar: '',
        bookstatus: false,
        borrowstatus: true,
      },
    ]);
  }

  if ((await Boardgame.count ()) == 0) {
    await Boardgame.createEach ([
      {
        id: 1,
        name: 'Carcassonne',
        type: 'Card Game',
        location: 'room101',
        avatar: '',
        bookstatus: false,
        borrowstatus: false,
      },
      {
        id: 2,
        name: '7 Wonders',
        type: 'City Building',
        location: 'room101',
        avatar: '',
        bookstatus: false,
        borrowstatus: true,
      },
    ]);
  }

  if ((await Material.count ()) == 0) {
    await Material.createEach ([
      {
        id: 1,
        name: 'Chair',
        quantity: 100,
        returnback: true,
        location: 'room101',
        avatar: '',
        bookstatus: false,
        borrowstatus: true,
      },
      {
        id: 2,
        name: 'Desk',
        quantity: 200,
        returnback: false,
        location: 'room202',
        avatar: '',
        bookstatus: false,
        borrowstatus: true,
      },
    ]);
  }

  if ((await Present.count ()) == 0) {
    await Present.createEach ([
      {
        id: 1,
        name: 'Candy',
        quantity: 50,
        size: "small",
        price: 1,
        donator:"Peter",
        location: 'room101',
        avatar: '',
      },
      {
        id: 2,
        name: 'Board Game',
        quantity: 10,
        size: "middle",
        price: 100,
        donator:"Tom",
        location: 'room101',
        avatar: '',
      },

      {
        id: 3,
        name: 'Xbox',
        quantity: 1,
        size: "large",
        price: 2000,
        donator:"Marry",
        location: 'room200',
        avatar: '',
      },
    ]);
  }

  const hash = await sails.bcrypt.hash ('123', saltRounds);
  if ((await User.count ()) == 0) {
    await User.createEach ([
      {id: 1, username: 'admin', password: hash, role: 'admin'},
      {id: 2, username: 'staff', password: hash, role: 'staff'},
      // etc.
    ]);
  }

  return;
};
