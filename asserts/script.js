jQuery(document).ready(function($){
	"use strict";
	if($('.woocommerce-products-header').length > 0){
		jQuery(".checkbox, .select-box").on("change",function(){
			jQuery("#wpaf-form").submit();
		});
		$('.submit-n').remove();
	}else{
		$('#wpaf-form').on('submit',function(e) {
			e.preventDefault(); // Prevent the default action for the form

			var admin_form = $(this);
			var ajax_url = admin_form.attr('data-ajax');
			var nonce = admin_form.attr('data-security');
			var action = admin_form.attr('data-action');

			var _data = $(this).serializeArray();
			// console.log(JSON.stringify(_data))
			console.log($(this).serializeArray());

			$.ajax({
				type : 'POST', //Post method
				url: ajax_url,
				dataType : "json",
				data: { '_wpnonce': nonce, 'action': action, 'option': $(this).serializeArray() },
				error: function(a, b, c){
					console.log(a, b, c);
				},
				success: function(a,b,c){
					console.log('success',a)
					$('.products').html(a);

				}
			})
		});
	}

});

// jQuery(function(){
// 	jQuery(".checkbox, .select-box").on("change",function(){
// 		jQuery("#wpaf-form").submit();
// 	});
// });