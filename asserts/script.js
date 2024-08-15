jQuery(document).ready(function($){

	$('#wpaf-form').on('submit',function(e) {
		e.preventDefault(); // Prevent the default action for the form

		var admin_form = $(this);
		var ajax_url = admin_form.attr('data-ajax');
		var nonce = admin_form.attr('data-security');
		var action = admin_form.attr('data-action');
		var url = admin_form.attr('data-url');
		var data_source = admin_form.attr('data-source');


		var _data = $(this).serializeArray();
		// console.log(JSON.stringify(_data))
		// console.log($(this).serializeArray());
		if(data_source === 'category' || data_source === 'post_tag'){
			$.ajax({
				type : 'POST', //Post method
				url: ajax_url,
				dataType : "json",
				data: { 'taxonomy':data_source, 'post_type':'post', '_wpnonce': nonce, 'action': action, 'url': url, 'option': $(this).serializeArray() },
				error: function(a, b, c){
					console.log(a, b, c);
				},
				success: function(a,b,c){
					// console.log('success',a,b,c);
					// Render Results

						// $('.woocommerce-pagination').html(a[2]);

					//$('.woocommerce-result-count').text(a[0]);
					// Remove WooCommerce Default Pagination
					$('.woocommerce-pagination').remove();
					$('.wpaf-pagination-wrap').remove();

					// Render Product HTML and Pagination
					$('.wp-block-post-template').html(a[1]);
					$('.wp-block-post-template').parent().append(a[2]);

					// $( '.products' ).after( $( '.custom-pagination' ) );

				}
			});
		}else if(data_source === 'product_cat' || data_source === 'product_tag' || data_source === 'product_brand'){
			$.ajax({
				type : 'POST', //Post method
				url: ajax_url,
				dataType : "json",
				data: { 'taxonomy':data_source, 'post_type':'product', '_wpnonce': nonce, 'action': action, 'url': url, 'option': $(this).serializeArray() },
				error: function(a, b, c){
					console.log(a, b, c);
				},
				success: function(a,b,c){
					console.log('success -ddd',a,b,c);
					// Render Results

						// $('.woocommerce-pagination').html(a[2]);

					$('.woocommerce-result-count').text(a[0]);
					// Remove WooCommerce Default Pagination
					$('.woocommerce-pagination').remove();
					$('.wpaf-pagination-wrap').remove();
					$('.wc-block-grid__products').html(' ');


					// Render Product HTML and Pagination
					$('.woocommerce-result-count').text(a[0]); // Update the product count text
					$('.products').html(a[1]); // Render the product HTML
					$('.wpaf-pagination-wrap').remove(); // Remove any existing pagination
					$('.woocommerce-pagination').remove(); // Remove existing WooCommerce pagination (if any)
					$('.products').parent().append(a[2]); // Append the new pagination HTML
					$('.wc-block-grid__products').append(a[1]); // Append the new pagination HTML
					// $('.wc-block-grid__products').append(b); // Append the new pagination HTML

					// updateProductList('wc-block-grid__products', 'wc-block-grid__product', b);
                    // updatePagination(c);

					// Clear any redundant HTML append calls
					// $('.products').parent().html(''); // Clear the parent container (if needed, adjust as required)

					// $( '.products' ).after( $( '.custom-pagination' ) );

				}
			});
		}
	});


});


