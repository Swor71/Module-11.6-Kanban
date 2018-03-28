function Card(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.$element = createCard();

	function createCard() {
		var $card = $('<li>').addClass('card').attr('id', self.id);
		var $cardDescription = $('<p>').addClass('card-description').text(self.name);
		var $cardDelete = $('<button>').addClass('btn-delete').text('x');

		$cardDelete.on('click', function() {
			self.removeCard();
		});
		
		$cardDescription.on('click', function(event) {
			self.editCard(event);
		});

		$card.append($cardDelete).append($cardDescription);

		return $card;
	}
}

Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function(response) {
				self.$element.remove();
			}
		});
	},
	editCard: function (event) {
		var self = this;
		var element = event.target;
		var columnID = $('#' + self.id).parents('.column').attr('id');

		var newCardDescription = prompt('Change card description to: ');

		if (newCardDescription != self.name && newCardDescription !== '') {
			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'PUT',
				data: {
					id: self.id,
					name: newCardDescription,
					bootcamp_kanban_column_id: columnID
				},
				success: function(response) {
					$(element).text(newCardDescription);
				}
			});
		};
	}
};