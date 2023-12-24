exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('post', {
    id: 'id',
    group_id: {
      type: 'integer',
      notNull: true
    },
    text: { type: 'text', notNull: true },
    created_by: {
      type: 'integer',
      notNull: true
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.createTable('comment', {
    id: 'id',
    post_id: {
      type: 'integer',
      notNull: true,
      references: 'post',
    },
    text: { type: 'text', notNull: true },
    created_by: {
      type: 'integer',
      notNull: true
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.createIndex('comment', 'post_id')
};

exports.down = pgm => {};
