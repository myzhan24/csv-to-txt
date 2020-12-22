# `@pws/pws-forms`

React Component Library for PWS Forms. Built with [UXCore2] components and [Storybook][storybook].

- [Installation][installation]
- [Usage][usage]
- [Test][test]
- [Publishing][publishing]
- [Deploying Storybook to GitHub Pages][deploying-storybook]
- [Contributing to `@pws/pws-forms`][contribute]

## Installation
``` bash
npm install --save @pws/pws-forms
```

### Installing with an Alias
```bash
npm install --save @pws/pws-forms-2.0.0@npm:@pws/pws-forms@2.0.0
npm install --save @pws/pws-forms-3.0.0@npm:@pws/pws-forms@3.0.0
```

When importing different versions of this package simultaneously, consider using npm's alias feature.

**Note**: Requires `npm` version `>=6.9.0`

#### Usage with Alias
```json
"dependencies": {
  "@pws/pws-forms-2.0.0": "npm:@pws/pws-forms@2.0.0",
  "@pws/pws-forms-3.0.0": "npm:@pws/pws-forms@3.0.0",
}
```

```js
 import { SampleTab as SampleTabv2 } from '@pws/pws-forms-2.0.0';
 import { SampleTab as SampleTabv3 } from '@pws/pws-forms-3.0.0';
 ```

### Peer Dependencies
``` bash
npm install --save @ux/uxcore2@^2001.2.6 prop-types@^15.7.2 react@^16.9.0 react-dom@^16.13.1 
```
The `package.json` of this codebase specifies the following `peerDependencies`. This means the application pulling in `@pws/pws-forms` must have the following installed as `dependencies`:
```json
{
    "@ux/uxcore2": "^2001.2.6",
    "prop-types": "^15.7.2",
    "react": "^16.9.0",
    "react-dom": "^16.13.1"
}
```

**Note**: Missing peer dependencies or mismatched versions may result in unexpected behavior. The above dependencies represents a state where `@pws/pws-forms` could be built and tested successfully.

## Usage
This section explains how to import and use React Components from `@pws/pws-forms`.

### Form Versioning
The major versions of this package coincide with the major versions found in the `formVersion` column of the `design-consultation` & `design-consultation-archives` tables from the [pws-api] codebase.

Following [semantic versioning][semver] rules, major versions of `@pws/pws-forms` must be compatible with major versions of the `formVersion` in [pws-api].
 
Minor version updates of this UI should be backward compatible. For example, `@pws/pws-forms@2.2.x` should be compatible with the API's `formVersion` `2.2.x`, `2.1.x`, and `2.0.x`.

Patch version updates of the UI should be backward compatible. For example, `@pws/pws-forms@2.10.16` should be compatible with the API's `formVersion` `2.10.15`, `2.10.14`, `2.10.13`, etc.
### Importing `@pws/pws-forms` Components
 You want to indirectly import or require Components in your client side
 code, similar to one of the examples below:
 
 ```js
 import { SampleTab } from '@pws/pws-forms';
 // or
 const { SampleTab } = require('@pws/pws-forms'); 
 ```

#### Examples
<details>
  <summary>SampleTab</summary>
  
  ```jsx
    import React from 'react';
    import { SampleTab } from '@pws/pws-forms';    
    
    const editableText = {
        label: 'Text Input',
        type: 'text',
        'data-type': 'string',
        required: false,
        disabled: false
    };
    
    const requiredText = {
        label: 'Required Text',
        type: 'text',
        'data-type': 'string',
        required: true,
        disabled: false
    };
    
    const disabledText = {
        label: 'Disabled Text',
        type: 'text',
        'data-type': 'string',
        required: false,
        disabled: true
    };
    
    const textArea = {
        label: 'Text Area',
        type: 'textarea',
        'data-type': 'string',
        required: false,
        disabled: false
    };
    
    export default function TabExample() {
        return (            
            <SampleTab
                titleA='Section A'
                inputA1={editableText}
                inputA2={requiredText}
                inputA3={disabledText}
                inputA4={textArea}
                titleB='Section B'
            />
        );
    }
  ```
</details>

## Test
Unit tests
``` bash
npm test
```
Storybook build
```bash
npm run build-storybook
```

## Publishing
This section explains how to prepare a Pull Request for publishing. The final publish command will be handled by the CICD pipeline for the master branch, defined in `cicd.yaml`. Based off of this [publishing to npm guide][publishing-guide].

Each pull request should also update the package version. This means for a new version, there should be updates to:
- `CHANGELOG.md` explaining the changes going into this version update
- `package.json`'s version property using the command `npm version <specific-version>`

### Preparing your Pull Request
While `npm publish`, the command that publishes a version of the repo to artifactory, is automatically executed as part of the CICD pipeline, we'll need to ensure `package.json` is updated with the new version.

#### Update `CHANGELOG.md`
The changelog versions should be in descending order, so more recent versions are at the top. This should be a concise description of all the new features, components, or fixes going into the new version. Think of it as a tool for the reader to easily understand how the repo changed between versions.

Open CHANGELOG.md in your text editor and add an entry like this:
```markdown
### 1.0.0
- Initial API, etc etc etc

### 0.1.0
- Older version notes
```

#### Revving package version

```bash
 # specific version, or
 npm version <new version>
 
 # Major/Minor/Patch change based on existing version
 npm version <major|minor|patch>
```
Make sure to use [semver] rules to understand major/minor/patch and to choose an appropriate version number. Be sure to check with the team **before** releasing major version bumps.

#### Dry Run Testing
You can observe the behavior of the `npm publish` command without it publishing the final contents with command:
```bash
npm run publish:dry-run
```

## Deploying Storybook to GitHub Pages
This section explains how to deploy the Storybook static site to GitHub Pages found at https://github.secureserver.net/pages/PWS/pws-forms/.

**Note**: `cicd.yaml` has a step to automatically deploy Storybook to its GitHub pages as part of its pipeline when a merge to master has been made.

In this repo, we leverage the [storybook-deployer] npm tool to help deploy to gh pages.


### Building
First, ensure Storybook builds successfully.

```bash
npm run build-storybook
```

### Deploy Dry Run
To see the deploy command run but skip the final upload step, run this command:
```bash
npm run deploy-storybook -- --dry-run
```

### Deploy
Before deploying, note that this command targets your current git remote `origin`.
For instance, if origin points to your fork, then your fork's GitHub Pages will be updated. 
```bash
npm run deploy-storybook
``` 

Then, visit https://github.secureserver.net/pages/PWS/pws-forms/ to see the Storybook static site.

## Contributing to `@pws/pws-forms`
This section explains how to work on `@pws/pws-forms` components locally to implement new features or new components. If you find an improvement for the documentation, please open a pull request.

**Note**: For a day to day workflow, see this [git workflow guide][git-workflow].

### Developing `@pws/pws-forms` components locally

To develop against an `@pws/pws-forms` component you will need to:

1. `git clone` the repo
1. `cd ./pws-forms` to change to the root directory of the project
1. `nvm install` to target this repo's `node` version
1. `npm install` from the root of the repo
1. `npm run storybook` to run storybook local against the examples
1. Done!

e.g.:

```bash
mkdir -p ~/git
cd ~/git
git clone git@github.secureserver.net:PWS/pws-forms
cd pws-forms
npm install

# Preview examples and run tests
npm run storybook
npm test
```

All tests should pass and you are set to start building out your components.

### Adding New Components

To add a new component one will need to:
 1. Create the component inside of `src/<my-component>.js`
 1. Update `src/index.js` and import & export the new component. By exporting it from the top-level `src/index.js` file, this exposes the component to any consumers of the npm package.
 1. Create a Storybook example inside of `examples/web/<my-component>-story.js` for testing new components
 1. Write Unit tests & UI tests for the component inside of `test/<my-component>.test.js`

```diff
// src/index.js

import SampleTab from './sample-tab';
+ import MyComponent from './my-component';

export {
  SampleTab,
+ MyComponent
};
```

#### Writing a Storybook Example
**[What is storybook?][what-is-storybook]**

>Storybook is an open-source tool that enables the component developers to:
>- Build components in isolation without worrying about business logic.
>- Test components with key/crucial states that are hard to reproduce in an app.
>- Document use cases as stories so that could be revisited during development, testing, and QA.
>- You can learn more about this tool on its official [website][storybook].

Add the following example component code to `examples/web/<my-component>-story.js`.
```jsx
import React from 'react';
import { MyComponent } from '@pws/pws-forms';

export default function MyComponentExample () {
  return (<MyComponent somePropName='someValue' />);
}
```

Additionally, `knobs` can be a powerful tool to change props directly on your React component inside of Storybook. Consider adding `knobs` to your storybook example. [See available knobs.][storybook-knobs]
```diff
-  return (<MyComponent somePropName='someValue' />);
+  return (<MyComponent somePropName={ text('Say hello to:', 'someValue')} />);
```

This creates a knob with the prompt Say hello to: and has a default value for it `someValue`.

Run `npm run storybook` or reload your browser if it's running already. Your story should appear on the left pane automatically!

#### Writing Tests
For Unit testing, we'll use libraries `mocha` and `sinon`.
For UI testing, we'll use `enzyme` to simulate instantiating a React component.

For a deep dive on writing tests, [check out this guide][unit-tests].



[installation]: #installation
[usage]: #usage
[test]: #test
[publishing]: #publishing
[deploying-storybook]: #deploying-storybook-to-github-pages
[contribute]: #contributing-to-pwspws-forms
[pws-api]: https://github.secureserver.net/PWS/subscription
[workflow]: https://github.secureserver.net/PWS/workflow
[semver]: https://semver.org/
[UXCore2]: https://github.secureserver.net/uxcore2/uxcore2
[publishing-guide]: https://github.secureserver.net/UX/uxp-docs/blob/master/meta/agile/git-workflow.md#publishing
[git-workflow]: https://github.secureserver.net/UX/uxp-docs/blob/master/meta/agile/git-workflow.md#ux-platform-git-workflow
[storybook]: https://storybook.js.org/docs/react/get-started/introduction
[what-is-storybook]: https://github.secureserver.net/front-end-days/control-item-detail-2019/tree/exercise-4#what-is-storybook
[storybook-knobs]: https://github.com/storybookjs/storybook/tree/master/addons/knobs#available-knobs
[unit-tests]: https://github.secureserver.net/front-end-days/control-item-detail-2019/tree/exercise-5#setup-unit-tests
[storybook-deployer]: https://github.com/storybookjs/storybook-deployer
