#Components

Call it components, call it [modules](https://smacss.com/book/type-module), call
it [blocks](http://getbem.com)... This is the meat of your stylesheet.

Components are discrete parts of your page that should sit within the regions of 
your layouts. You should try to abstract your components as much as possible to 
promote reuse throughout the theme. 

Components should be flexible enough to respond to any width and should never rely 
on context (e.g. `.sidebar-first .component`) for styling. This allows components 
to be placed throughout the theme with no risk of them breaking.

If you find you need to change the look of a component depending on it's context 
you should avoid using context based classes. Instead it is better to add another 
"modifier" class to the component to alter the styling. Again, this promotes reuse.

Sub-component are the individual parts that make up a component. As a general rule, 
adding a class to target a sub-component is a much better option than using descendant 
selectors or element selectors. In many cases sub-component can be made more 
reusable by making them components in their own right, so they can then be used 
within other components.

Almost everything that doesn't belong in base should be made a component.

Components do not always need to produce classes, and as such it is acceptable to
use placeholders for your component if you find it necessary.

Components should be documented with you styleguide of choice, such as 
[Hologram](http://trulia.github.io/hologram/), [PatternLab](http://patternlab.io/) 
or [KSS](http://warpspire.com/kss/).


