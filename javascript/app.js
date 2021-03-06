/** @jsx React.DOM */

var AnswerRadioInput = React.createClass({
	render: function () {
		return (
			<div className="radio">
				<label>
					<input type="radio" />
					Label Text
				</label>
			</div>
		);
	}
});


var AnswerRadioInput = React.createClass({
	propTypes : {
		id : React.PropTypes.string,
		name : React.PropTypes.string.isRequired,
		label : React.PropTypes.string.isRequired,
		value : React.PropTypes.string.isRequired,
		checked : React.PropTypes.bool,
		onChanged: React.PropTypes.func.isRequired
	},
	getDefaultProps: function () {
		return {
			id: null,
			checked: false
		};
	},
	getInitialState: function () {
		var id = this.props.id ? this.props.id : uniqueId('radio-');
		return {
			checked: !!this.props.checked,
			id: id,
			name: id
		};
	},
	render: function() {
		return (
			<div className="radio">
				<label htlmFor={this.props.id}>
					<input type="radio" name={this.props.name} id={this.props.id} value={this.props.value} checked={this.state.checked} onChange={this.handleChanged} />
					{this.props.label}
				</label>
			</div>
		);
	},
	handleChanged: function (e) {
		var checked = e.target.checked;
		this.setState({checked: checked});
		if(checked) {
			this.props.onChanged(this.props.value);
		}
	}
});


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


// <AnswerMultipleChoiceQuestion choices={arrayOfChoices} ... />

var arrayOfChoices = ["one", "two", "three"];

React.renderComponent(<AnswerMultipleChoiceQuestion choices={arrayOfChoices} onCompleted={function(){
	console.log("onCompleted ran");
}} />,  document.getElementById("main"));

