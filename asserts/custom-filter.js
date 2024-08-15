jQuery(document).ready(function($) {
    function updateProductList(ulClass, liClass, products) {
        var $ul = jQuery('.' + ulClass);
        $ul.empty();

        $.each(products, function(index, product) {
            var $li = jQuery('<li>').addClass(liClass);

            var $productImage = jQuery('<div>').addClass('wc-block-components-product-image wc-block-grid__product-image')
                .append(jQuery('<a>').attr('href', product.url)
                .append(jQuery('<img>').attr('src', product.image).attr('alt', product.title)));

            var $productTitle = jQuery('<h2>').addClass('wc-block-components-product-title wc-block-grid__product-title')
                .append(jQuery('<a>').attr('href', product.url).text(product.title));

            var $productPrice = jQuery('<div>').addClass('wp-block-woocommerce-product-price')
                .append(jQuery('<span>').addClass('wc-block-components-product-price wc-block-grid__product-price price')
                .html('<del class="wc-block-components-product-price__regular wc-block-grid__product-price__regular">' + product.regular_price + '</del>' +
                    '<ins class="wc-block-components-product-price__value is-discounted wc-block-grid__product-price__value wc-block-grid__product-price__value--on-sale">' + product.sale_price + '</ins>'));

            var $addToCartButton = jQuery('<div>').addClass('wp-block-button wc-block-components-product-button wc-block-grid__product-add-to-cart')
                .append(jQuery('<button>').addClass('wp-block-button__link wp-element-button add_to_cart_button wc-block-components-product-button__button')
                .attr('aria-label', 'Add to cart: “' + product.title + '”').text('Add to cart'));

            $li.append($productImage, $productTitle, $productPrice, $addToCartButton);
            $ul.append($li);
        });
    }

    function updatePagination(paginationHtml) {
        jQuery('.wc-block-pagination').html(paginationHtml);
    }

    function fetchProducts(page = 1, category = '') {
        jQuery.ajax({
            url: ajax_object.ajax_url,
            type: 'POST',
            data: {
                action: 'filter_and_paginate_products',
                category: category,
                page: page
            },
            success: function(response) {
                if (response.success) {
                    updateProductList('wc-block-grid__products', 'wc-block-grid__product', response.data.products);
                    updatePagination(response.data.pagination);
                } else {
                    console.log('No products found.');
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error:', error);
            }
        });
    }

    $('#product-category-filter').on('change', function() {
        var selectedCategory = jQuery(this).val();
        fetchProducts(1, selectedCategory);
    });

    $(document).on('click', '.wc-block-pagination-page', function(e) {
        e.preventDefault();
        var page = jQuery(this).text();
        var selectedCategory = jQuery('#product-category-filter').val();
        fetchProducts(page, selectedCategory);
    });

    // Initial load
    fetchProducts();
});
