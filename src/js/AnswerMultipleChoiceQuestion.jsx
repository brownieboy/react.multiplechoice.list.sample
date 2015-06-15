var React = require('react');
var _ = require('underscore');
var AnswerRadioInput = require("./AnswerRadioInput.jsx");

var AnswerMultipleChoiceQuestion = React.createClass({
	propTypes: {
		value: React.PropTypes.string,
		choices: React.PropTypes.array.isRequired,
		onCompleted: React.PropTypes.func.isRequired
	},
	getInitialState: function() {
		return {
			id: _.uniqueId('multiple-choice-'),
			value: this.props.value
		};
	},
	renderChoices: function() {
		return this.props.choices.map(function(choice, i) {
			return AnswerRadioInput({
				id: "choice-" + i,
				name: this.state.id,
				value: choice,
				label: choice,
				checked: this.state.value === choice,
				onChanged: this.handleChanged
			});
		}.bind(this));
	},
	render: function() {
		return (
			<div className="form-group">
				<label className="survey-item-label" htmlFor={this.state.id}>{this.props.label}</label>
				<div className="survey-item-content">
					{this.renderChoices()}
				</div>
			</div>
		);
	},
	handleChanged: function(value) {
		this.setState({value: value});
		this.props.onCompleted(value);
	}
});

module.exports = AnswerMultipleChoiceQuestion;

