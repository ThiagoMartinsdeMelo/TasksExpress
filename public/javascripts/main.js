(function(){
	var socket = io('http://localhost:3000');
	socket.on('hello', function(msg){
		console.log(msg);
	});
	$('form').submit(function(){
		$.post(
			$(this).attr('action'),
			$(this).serialize()
		).done((data)=>{
			$(this).trigger("reset");
			var table_html = `<tr>
						<td>
							# ${$('tr').lenght + 1} <strong>${data.title}</strong>
						</td>
						<td class="actions">
							<a href="/turn/${data._id}" class="color-red">
								not completed
							</a>
						</td>
						<td class="hightlight">
							${data.description}
						</td>
					</tr>`;
			$('tbody').append(table_html);					
		});
		return false;
	});
	$(document).on('click', 'table a', function(){
		$.get(
			$(this).attr('href')
		).done((data)=>{
			$(this).toggleClass('color-red');
			if ($(this).text().trim() == 'ok') {
				$(this).text('not completed');
			} else {
				$(this).text('ok');
			}
		});
		return false;
	});
})()