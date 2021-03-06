import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import _ from 'lodash';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component{
  renderFields(){
    //redux form will automatically forward props of field to the component
    return _.map( formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          type="text"
          name={name}
          label={label}
          component={SurveyField}/>
      );
    });
  }
	render(){
		return (
    	<div>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit )}
          // this props of handleSubmit is from reduxForm
        >
  				{this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            NEXT
            <i className="material-icons right"> done</i>
          </button>
        </form>
			</div>
		);
	}
}
function validate(values){
  const errors = {};
  errors.recipients = validateEmails(values.recipients || '');

  formFields.forEach(({ name }) => {
    if(!values[name]){
      errors[name] = 'You must provide a value';
    }
  });
  return errors;
}
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
