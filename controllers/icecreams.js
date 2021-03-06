const IceCream = require('../models/IceCream_Schema');

module.exports.index = function(request, response, next) {
  IceCream.distinct('_id')
    .then(IceCreamNames => response.redirect(`/icecreams/${IceCreamNames[0]}`))
    .catch(error => next(error));
};

// GET /icecreams/:id
module.exports.retrieve = function(request, response, next) {
  const queries = [
    IceCream.findById(request.params.id),
    IceCream.distinct('_id')
  ];

  Promise.all(queries).then(function([icecream, IceCreamNames]) {
    if (icecream) {
      response.render('icecreams/index', {icecream: icecream, IceCreamNames: IceCreamNames});
    } else {
      next();
    }
  }).catch(error => next(error));
};

// POST
module.exports.create = function(request, response, next) {
  IceCream.create(request.body)
    .then(icecream => response.status(201).send(icecream.id))
    .catch(error => next(error));
};

// DELETE
module.exports.delete = function(request, response, next) {
  IceCream.findByIdAndDelete(request.params.id)
    .then(icecream => icecream ? response.status(200).end() : next())
    .catch(error => next(error));
};

// PUT
module.exports.update = function(request, response, next) {
  request.body.fillings = request.body.fillings || [];
  request.body.flavors = request.body.flavors || [];

  IceCream.findByIdAndUpdate(request.params.id, request.body, {runValidators: true})
    .then(icecream => icecream ? response.status(200).end() : next())
    .catch(error => next(error));
};
