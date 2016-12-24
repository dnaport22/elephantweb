#Util

Collection of variables and any generic mixins or functions.

Using variables makes it much easier to ensure consistency throughout your 
stylesheets for values such as colors and numeric values.

When creating variables, consider the following rules

- the value is repeated at least twice;
- the value is likely to be updated at least once;
- all occurrences of the value are tied to the variable (i.e. not by coincidence).

Sass variables are `$hyphen-separated` NOT `$camelCase` or `$underscore_separated`.

Constants (not a real thing in Sass) can be represented as `$UPPERCASE_UNDERSCORE_SEPARATED`;

Sass variables should be documented using [SassDoc](http://sassdoc.com/).
