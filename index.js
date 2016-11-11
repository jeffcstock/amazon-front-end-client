$(function (){
  var productDetails = $('.product-details');
  var productsList = $('.products-list');

  getProducts();

  productsList.on('click', 'li a', function(event){
    var productId = $(this).parents('li').data('id');
    getProduct(productId);
    $(event.delegateTarget).fadeOut(300, function(){
      productDetails.fadeIn(300);
    })
  })

  productDetails.on('click', '.back-btn', function(event){
    productDetails.fadeOut(300, function(){
      productsList.fadeIn(300);
    })
  })
});

var DOMAIN = 'http://localhost:3000'

function getProducts (){
  $.ajax({
    url: `${DOMAIN}/products.json`,
    success: function (products){
      renderProducts(products)
    },
    error: function (){
      alert('could not load products...')
    }
  })
};

function getProduct (id){
  $.ajax({
    url: `${DOMAIN}/products/${id}.json`,
    success: function(product){
      console.log(product.tags)
      renderProduct(product);
      renderTags(product);
    },
    failure: function(){
      alert(`Could not find product with id: ${id}...`);
    }
  })
};

function renderProducts(products){
  var productsTemplate = $('#products-tmpl').html();
  var productsList = $('.products-list');

  productsList.html(Mustache.render(productsTemplate, products));
};

function renderProduct(product) {
  var productTmpl = $('#product-tmpl').html();
  var productDetails = $('.product-details');

  productDetails.html(Mustache.render(productTmpl, product));
}

function renderTags(product) {
  var productTagsTmpl = $('#product-tags-tmpl').html();
  var productTags = $('.product-tags');

  productTags.html(Mustache.render(productTagsTmpl, product.tags));
}
