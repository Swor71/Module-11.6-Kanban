var board = {
	name: 'Kanban board',
	createColumn: function(column){
		this.$element.append(column.$element);
		initSortable();
	},
	$element: $('#board .column-container')
};

function initSortable() {
	$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeholder: 'card-placeholder'
	}).disableSelection();
}

$('.create-column').click(function(){
	var columnName = prompt('Enter the name of a column');
	$.ajax({
		url: baseUrl + '/column',
		method: 'POST',
		data: {
			name: columnName
		},
		success: function(response) {
			var column = new Column(response.id, columnName);
			board.createColumn(column);
		}
	});
});