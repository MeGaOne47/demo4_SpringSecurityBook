package com.example.demo.Validator;

import com.example.demo.entity. Category;
import com.example.demo.Validator.anotation.ValidCategoryId;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
public class ValidCategoryIdValidator implements ConstraintValidator<ValidCategoryId, Category> {
    @Override
    public boolean isValid (Category category, ConstraintValidatorContext context) {
        return category != null && category.getId() != null;
    }
}
