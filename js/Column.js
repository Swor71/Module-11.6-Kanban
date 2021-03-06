function Column(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.$element = createColumn();

	function createColumn() {
		var $column = $('<div>').addClass('column').attr('id', self.id);
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete').text('x');
		var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

		$columnDelete.click(function(){
			self.removeColumn();
		});

		$columnAddCard.click(function(event){
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			if (cardName) {
				$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
					name: cardName,
					bootcamp_kanban_column_id: self.id
				},
				success: function(response) {
					var card = new Card(response.id, cardName);
					self.createCard(card);
				}
			})
			}
		});

		$columnTitle.click(function() {
			var newColumnName = prompt('Change column name to:');
			if(newColumnName != self.name && newColumnName !== '') {
				$columnTitle.text(newColumnName);
				self.editColumn(newColumnName);
			};
		});

		$column.append($columnTitle).append($columnDelete).append($columnAddCard).append($columnCardList);
		
		return $column;
	}
}

Column.prototype = {
	createCard: function(card) {
		this.$element.children('ul').append(card.$element);
	},
	removeColumn: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function(response) {
				self.$element.remove();
			}
		});
	},
	editColumn: function(newColumnName) {
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'PUT',
			data: {
				name: newColumnName,
				bootcamp_kanban_column_id: self.id
			},
			success: function(response) {
				self.name = newColumnName;
			}
		});
	}
};