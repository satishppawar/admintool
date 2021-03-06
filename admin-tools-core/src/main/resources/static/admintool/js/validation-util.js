/**
 * Admintool utility class for 1000Hz validation plugin
 * 
 * @author André
 * @Since 1.2.0
 */
AdminTool.ValidationUtil = function(parent) {
	var self = this;

	this.construct = function(parent) {
		this.parent = parent;
		this.options = {};
		$.extend(true, this.options, parent.options);
	};
	
	this.create = function(formId) {
		return getByID(formId).validator();
	};
	
	this.destroy = function(formId) {
		getByID(formId).validator('destroy');
	};
	
	this.validate = function(formId) {
		getByID(formId).validator('validate');
		return self.hasValidationErrors(formId);
	};

	this.hasValidationErrors = function(formId) {
		return getByID(formId).data('bs.validator').hasErrors();
	};

	this.showCustomError = function(fieldId, message, formId) {
		var $field = getByID(fieldId);
		$field.data('bs.validator.errors', [ message ]);
		getByID(formId).data('bs.validator').showErrors($field);
	};

	this.reloadValidator = function(formId) {
		self.destroy(formId);
		// validator doesn't remove everything
		getByID(formId).find('.form-control-feedback').removeClass(
				'glyphicon-remove');
		self.create(formId);
	};

	this.showFieldErrorsOnATErrorList = function(data, formId) {
		var globalErrors = [];
		for (var i = 0; i < data.length; i++) {
			var error = data[i];
			if (error.field && error.field.length > 0) {
				self.showCustomError(error.field, error.message, formId);
			} else {
				globalErrors.push('<li>' + error.message + '</li>');
			}
		}

		if (globalErrors.length > 0) {
			self.parent.appendToErrorModal('<ul>' + globalErrors.join('') + '</ul>');
		}
	};

	this.construct(parent);
};