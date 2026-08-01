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

### Composing methods

- **Extract Method:** turn a fragment into a method with a name.
- **Inline Method:** put the method body into its caller.
- **Extract Variable:** turn an expression into a named variable.
- **Inline Variable:** replace a variable with its value.
- **Replace Temp with Query:** turn the temp into a method call.
- **Split Temporary Variable:** make each temp do one thing.
- **Remove Assignments to Parameters:** use a local variable instead.
- **Replace Method with Method Object:** turn a long method into its own object.
- **Substitute Algorithm:** swap a complex algorithm for a simpler one.

### Moving features

- **Move Method:** move a method to the class that uses it most.
- **Move Field:** move a field to the class that uses it most.
- **Move Statements into Function:** move code to a function.
- **Move Statements out of Function:** opposite.
- **Inline Class:** move all features into another class.
- **Hide Delegate:** encapsulate the delegation.

### Organizing data

- **Replace Magic Number with Symbolic Constant:** name the constant.
- **Encapsulate Field:** make fields private with accessors.
- **Encapsulate Collection:** hide the collection.
- **Replace Type Code with Class:** create a class for the type.
- **Replace Type Code with Subclasses:** when behavior varies.
- **Replace Type Code with State/Strategy:** when state affects behavior.
- **Replace Array with Object:** when an array represents a record.

### Simplifying conditional logic

- **Decompose Conditional:** extract methods from if/else.
- **Consolidate Conditional Expression:** combine ifs with same result.
- **Replace Nested Conditional with Guard Clauses:** flatten logic.
- **Replace Conditional with Polymorphism:** when behavior varies.
- **Introduce Null Object:** replace null checks with a NullObject.
- **Introduce Assertion:** make assumptions explicit.

### Simplifying method calls

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

### Dealing with generalization

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

### Bloaters

- Long Method
- Large Class
- Primitive Obsession
- Long Parameter List
- Data Clumps
- Switch Statement

### Object-Orientation Abusers

- Switch Statement (when polymorphism is better)
- Temporary Field
- Refused Bequest
- Alternative Classes with Different Interfaces

### Change Preventers

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
