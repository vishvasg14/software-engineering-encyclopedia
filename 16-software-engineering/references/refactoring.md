# Refactoring Reference

The canonical reference for refactoring is Martin Fowler's book and website.

## Primary reference

- **Refactoring book (2nd ed):** <https://martinfowler.com/books/refactoring.html
- **Refactoring website:** <https://refactoring.com/
- **Refactoring catalog:** <https://refactoring.com/catalog/

## What is refactoring?

Refactoring is the process of changing a software system in a way that does not alter the external behavior of the code yet improves its internal structure. It is a disciplined way to clean up code that minimizes the chances of introducing bugs.

**Key principle:** refactoring changes the internal structure without changing external behavior.

## When to refactor

- **Rule of Three:** first time you do something, just do it. Second time, you wince at the duplication. Third time, you refactor.
- **Before adding a feature:** clean up the area you'll change.
- **After getting a feature working:** the code works; make it cleaner.
- **During code review:** suggestions for refactoring.
- **When fixing a bug:** the bug may indicate a structural problem.

## Refactoring catalog (selected)

### Composing methods <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23composing-methods%0A%0ASection%20title%3A%20Composing%20methods' target='_blank' rel='noopener' data-askgpt='Composing methods' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/refactoring.md#composing-methods' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23composing-methods%0A%0ASection%20title%3A%20Composing%20methods' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23composing-methods%0A%0ASection%20title%3A%20Composing%20methods' title='Ask ChatGPT about this section'>💬</a>

- **Extract Method:** turn a fragment into a method with a name.
- **Inline Method:** put the method body into its caller.
- **Extract Variable:** turn an expression into a named variable.
- **Inline Variable:** replace a variable with its value.
- **Replace Temp with Query:** turn the temp into a method call.
- **Split Temporary Variable:** make each temp do one thing.
- **Remove Assignments to Parameters:** use a local variable instead.
- **Replace Method with Method Object:** turn a long method into its own object.
- **Substitute Algorithm:** swap a complex algorithm for a simpler one.

### Moving features <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23moving-features%0A%0ASection%20title%3A%20Moving%20features' target='_blank' rel='noopener' data-askgpt='Moving features' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/refactoring.md#moving-features' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23moving-features%0A%0ASection%20title%3A%20Moving%20features' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23moving-features%0A%0ASection%20title%3A%20Moving%20features' title='Ask ChatGPT about this section'>💬</a>

- **Move Method:** move a method to the class that uses it most.
- **Move Field:** move a field to the class that uses it most.
- **Move Statements into Function:** move code to a function.
- **Move Statements out of Function:** opposite.
- **Inline Class:** move all features into another class.
- **Hide Delegate:** encapsulate the delegation.

### Organizing data <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23organizing-data%0A%0ASection%20title%3A%20Organizing%20data' target='_blank' rel='noopener' data-askgpt='Organizing data' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/refactoring.md#organizing-data' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23organizing-data%0A%0ASection%20title%3A%20Organizing%20data' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23organizing-data%0A%0ASection%20title%3A%20Organizing%20data' title='Ask ChatGPT about this section'>💬</a>

- **Replace Magic Number with Symbolic Constant:** name the constant.
- **Encapsulate Field:** make fields private with accessors.
- **Encapsulate Collection:** hide the collection.
- **Replace Type Code with Class:** create a class for the type.
- **Replace Type Code with Subclasses:** when behavior varies.
- **Replace Type Code with State/Strategy:** when state affects behavior.
- **Replace Array with Object:** when an array represents a record.

### Simplifying conditional logic <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23simplifying-conditional-logic%0A%0ASection%20title%3A%20Simplifying%20conditional%20logic' target='_blank' rel='noopener' data-askgpt='Simplifying conditional logic' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/refactoring.md#simplifying-conditional-logic' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23simplifying-conditional-logic%0A%0ASection%20title%3A%20Simplifying%20conditional%20logic' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23simplifying-conditional-logic%0A%0ASection%20title%3A%20Simplifying%20conditional%20logic' title='Ask ChatGPT about this section'>💬</a>

- **Decompose Conditional:** extract methods from if/else.
- **Consolidate Conditional Expression:** combine ifs with same result.
- **Replace Nested Conditional with Guard Clauses:** flatten logic.
- **Replace Conditional with Polymorphism:** when behavior varies.
- **Introduce Null Object:** replace null checks with a NullObject.
- **Introduce Assertion:** make assumptions explicit.

### Simplifying method calls <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23simplifying-method-calls%0A%0ASection%20title%3A%20Simplifying%20method%20calls' target='_blank' rel='noopener' data-askgpt='Simplifying method calls' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/refactoring.md#simplifying-method-calls' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23simplifying-method-calls%0A%0ASection%20title%3A%20Simplifying%20method%20calls' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23simplifying-method-calls%0A%0ASection%20title%3A%20Simplifying%20method%20calls' title='Ask ChatGPT about this section'>💬</a>

- **Rename Method:** clear names.
- **Add Parameter:** add missing information.
- **Remove Parameter:** drop unused.
- **Parameterize Method:** general value.
- **Replace Parameter with Explicit Methods:** separate methods.
- **Preserve Whole Object:** pass object instead of fields.
- **Replace Parameter with Method Call:** call method instead of passing.
- **Introduce Parameter Object:** group related parameters.
- **Remove Setting Method:** make field immutable.
- **Hide Method:** make private.
- **Replace Constructor with Factory Method:** use factory.
- **Replace Error Code with Exception:** use exceptions.

### Dealing with generalization <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23dealing-with-generalization%0A%0ASection%20title%3A%20Dealing%20with%20generalization' target='_blank' rel='noopener' data-askgpt='Dealing with generalization' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/refactoring.md#dealing-with-generalization' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23dealing-with-generalization%0A%0ASection%20title%3A%20Dealing%20with%20generalization' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23dealing-with-generalization%0A%0ASection%20title%3A%20Dealing%20with%20generalization' title='Ask ChatGPT about this section'>💬</a>

- **Pull Up Method:** move subclass method to superclass.
- **Push Down Method:** move superclass method to subclass.
- **Pull Up Constructor Body:** move to superclass constructor.
- **Extract Superclass:** create superclass.
- **Extract Subclass:** create subclass.
- **Extract Interface:** create interface.
- **Collapse Hierarchy:** merge classes.
- **Replace Inheritance with Delegation:** use composition.
- **Replace Delegation with Inheritance:** use inheritance.

## Code smells (selected)

A **code smell** is a surface indication of a deeper problem. From Fowler's book.

### Bloaters <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23bloaters%0A%0ASection%20title%3A%20Bloaters' target='_blank' rel='noopener' data-askgpt='Bloaters' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/refactoring.md#bloaters' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23bloaters%0A%0ASection%20title%3A%20Bloaters' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23bloaters%0A%0ASection%20title%3A%20Bloaters' title='Ask ChatGPT about this section'>💬</a>

- Long Method
- Large Class
- Primitive Obsession
- Long Parameter List
- Data Clumps
- Switch Statement

### Object-Orientation Abusers <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23object-orientation-abusers%0A%0ASection%20title%3A%20Object-Orientation%20Abusers' target='_blank' rel='noopener' data-askgpt='Object-Orientation Abusers' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/refactoring.md#object-orientation-abusers' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23object-orientation-abusers%0A%0ASection%20title%3A%20Object-Orientation%20Abusers' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23object-orientation-abusers%0A%0ASection%20title%3A%20Object-Orientation%20Abusers' title='Ask ChatGPT about this section'>💬</a>

- Switch Statement (when polymorphism is better)
- Temporary Field
- Refused Bequest
- Alternative Classes with Different Interfaces

### Change Preventers <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23change-preventers%0A%0ASection%20title%3A%20Change%20Preventers' target='_blank' rel='noopener' data-askgpt='Change Preventers' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/refactoring.md#change-preventers' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23change-preventers%0A%0ASection%20title%3A%20Change%20Preventers' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Frefactoring.md%23change-preventers%0A%0ASection%20title%3A%20Change%20Preventers' title='Ask ChatGPT about this section'>💬</a>

- Divergent Change
- Shotgun Surgery
- Parallel Inheritance Hierarchies

## Refactoring process

1. **Add a test** that reproduces the existing behavior.
2. **Make the change** in small steps.
3. **Run the test** to verify behavior unchanged.
4. **Commit** each successful step.

Tools: IDE refactoring features (IntelliJ, VSCode), jscodeshift (JS), codemod tools, clang-tidy (C++).

## Testing and refactoring

Refactoring without tests is dangerous. You need:
- A comprehensive test suite.
- Good coverage of the area being refactored.
- Fast tests (otherwise refactoring is too slow).
- Mutation testing to verify tests catch real bugs (see Testing doc).

## Books

- *Refactoring* — Martin Fowler (2nd ed, 2018).
- *Working Effectively with Legacy Code* — Michael Feathers.
- *Clean Code* — Robert C. Martin.
- *Working Effectively with Unit Tests* — Lasse Koskela.

## Online resources

- **Refactoring website:** <https://refactoring.com/>
- **Catalog:** <https://refactoring.com/catalog/>
- **Source making:** <https://sourcemaking.com/refactoring>
