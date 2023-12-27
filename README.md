# mcts-tic-tac-toe

Tic Tac Toe game implementation featuring a Monte Carlo based AI engine.

### Dependency Notes

The project has no production dependencies and our goal is to keep it that way. If you would like to add a dependency, please create an issue explaining why the dependency is unavoidable or clearly the correct choice.

We do have several dev dependencies:
| Dependency | Description |
|--------------|-----------------------------|
| Vitest | Unit testing |
| Playwright | E2E testing |
| Vite | Bundler |
| Eslint | Linter |
| Prettier | Formatter |
| TypeScript | JavaScript with strict types |

<u>To add a dev dependency:</u>

- Submit a PR updating this file, package.json, and package-lock.json.
- Be sure to include an explanation as to why the dev dependency is useful.

#### Submitting a Pull Request

- clone this repo
- create a git branch off of main
- make the changes you desire
- push the changes to GitHub
- make a pull request
- Be sure to include:
  - Tests
  - Confirmation that all tests are still passing
  - Text description of the changes
  - Self-review if appropriate
  - Request at least one reviewer

#### Reviewing a Pull Request

- Be kind!
- Make sure included tests have considered edge cases.
- Make sure the code has no smells.
- Feel free to make any suggestions you think are appropriate.
- If the code needs improvement, request changes.
- If the code is satisfactory, approve the PR.
- Be kind!

#### Credits

@Matthew-Nicholson:

- AI
  - Monte Carlo Tree Search implementation.
  - UCB1 implementation.
- Architecture
  - Folder structure.
  - Code quality rules.
    - ESLint
    - Prettier
    - GitHub rules
  - MVC Architecture
  - Event Bus
  - Schemas and Types

@AbrahamDN

- UI
  - Planning
  - Design
  - Components
  - Views
  - Testing
