(function ($) {

	let url = $('#url');
	let name = $('#title');
	let author = $('#author');
	let generate = $('#generate');
	let generator = $('#generator');
	let automatic = $('#automatic');

	let reference = "";

	generator.on('submit', (e) => {
		e.preventDefault();

		var monthsOfYear = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];

		if (automatic.is(':checked') || name.val() == '') {
			$.get('GetTitle/' + url.val(), function(res) {
				if (res.success) {
					name.val(decodeURI(res.title));
				}

				generateReference();
			});
		} else {
			generateReference();
		}

		function generateReference() {
			if (name.val() && url.val()) {
				if (author.val()) {
					let authors = author.val().split(',');

					let authorNames = authors[0].split(' ');
					reference += authorNames[authorNames.length - 1].toUpperCase() + ', ';
					reference += authorNames.splice(0, authorNames.length - 1).join(' ');

					if (authors.length == 2) {
						let authorNames = authors[1].split(' ');
						reference += '; ' + authorNames[authorNames.length - 1].toUpperCase() + ', ';
						reference += authorNames.splice(0, authorNames.length - 1).join(' ') + '. ';
					} else {
						reference += '. ';
					}
				}

				let date = new Date;
				let dayFull = ('0' + date.getDate()).substr(-2);
				let dateStr = [dayFull, monthsOfYear[date.getMonth()], date.getFullYear(), ''].join(' ');

				reference += `<strong>${name.val()}</strong>. `;
				reference += `Disponível em: &lt;${url.val()}&gt;. `;
				reference += `Acesso em: ${dateStr}`;

				var el = $('#reference');
				el.show();
				el.html(reference);

				new Clipboard('.copy');
				$('.copy').show();

				reference = "";
			}
		}
	});

})( window.jQuery );