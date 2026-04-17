# con-oo-akaneska - Review

## Review 结论

当前实现已经把若干 Svelte store 接进了真实界面，开始游戏、棋盘渲染、输入和胜利弹窗都有调用链，但它并没有实现作业要求中的 `src/domain/*` 领域对象，也没有把 `Game/Sudoku` 作为核心模型来驱动 UI。整体更像“基于全局 store 的状态拼装”，而不是一次合格的 OOP/OOD 接入；其中 Undo/Redo 缺失、业务约束下沉到 UI、状态分散等问题会明显影响设计质量。

## 总体评价

| 维度 | 评价 |
| --- | --- |
| OOP | poor |
| JS Convention | fair |
| Sudoku Business | fair |
| OOD | poor |

## 缺点

### 1. 作业要求的领域层实际上缺失

- 严重程度：core
- 位置：src/domain/*
- 原因：仓库中没有 `src/domain/*`，也没有可识别的 `Sudoku` / `Game` 领域对象实现；真实流程使用的是 `src/node_modules/@sudoku/game.js` 和若干 store。这样既不满足“领域对象存在并被 View 消费”的作业要求，也无法体现 OOP 中对象承担状态、行为、约束与演进历史的设计意图。

### 2. Undo / Redo 没有实现也没有接入真实流程

- 严重程度：core
- 位置：src/components/Controls/ActionBar/Actions.svelte:26-35, src/node_modules/@sudoku/game.js:13-56
- 原因：界面上虽然有 Undo / Redo 按钮，但按钮没有 `on:click`，`@sudoku/game` 里也没有 `undo()` / `redo()` 或 history 管理。这直接违反了作业对 `Game` 责任和真实接入流程的硬性要求，也说明当前业务建模并没有覆盖数独游戏的完整交互闭环。

### 3. 关键业务约束依赖 UI 阻止，而不是由模型自身保证

- 严重程度：major
- 位置：src/node_modules/@sudoku/stores/grid.js:73-86, src/node_modules/@sudoku/stores/keyboard.js:6-10
- 原因：`userGrid.set` 和 `userGrid.applyHint` 会直接写入任意位置，没有校验是否为题目给定格、坐标是否合法、数字是否在 0-9 范围内；“给定格不可改”主要靠 `keyboardDisabled` 这种 UI 层条件来限制。这样会让领域约束失真：一旦换入口、补功能或写测试，模型本身并不能保证业务合法性。

### 4. 游戏逻辑被拆散到多个全局 store 和组件中，缺少清晰的聚合根或 adapter

- 严重程度：major
- 位置：src/node_modules/@sudoku/game.js:13-56, src/node_modules/@sudoku/stores/grid.js:7-137, src/node_modules/@sudoku/stores/game.js:7-20, src/components/Board/index.svelte:2-29, src/components/Controls/Keyboard.svelte:2-27
- 原因：开始游戏在 `game.js`，落子在 `userGrid`，校验在 `invalidCells`，胜利判断在 `stores/game.js`，候选数和笔记又是独立 store，组件直接横向依赖多个 store。这样虽然能跑，但对象边界非常弱，UI 没有消费一个清晰的 `Game`/adapter，而是在消费碎片化状态，后续要补 history、序列化、多人入口或更复杂交互时会快速恶化。

### 5. 开始新局时没有完整重置候选数和笔记状态

- 严重程度：major
- 位置：src/node_modules/@sudoku/game.js:13-33, src/node_modules/@sudoku/stores/candidates.js:3-29, src/node_modules/@sudoku/stores/notes.js:3-12
- 原因：`startNew` / `startCustom` 只重置了 difficulty、grid、cursor、timer、hints，没有清空 `candidates`，也没有把 `notes` 恢复默认值。这样新的一局会继承上一局的候选标记和笔记模式，破坏数独游戏流程的一致性，也说明“游戏会话状态”没有被一个统一对象正确管理。

### 6. 依赖原地 mutate 触发 store 更新，代码风格和可演进性较差

- 严重程度：minor
- 位置：src/node_modules/@sudoku/stores/grid.js:74-76, src/node_modules/@sudoku/stores/candidates.js:10-26
- 原因：`userGrid.update` 和 `candidates.update` 都是直接修改原对象后返回同一引用。这在当前 Svelte store 语义下通常还能通知订阅者，但它把响应式正确性绑定到了实现细节，不利于后续做快照、撤销重做、时间旅行或迁移到别的状态管理方式，也不符合现代 JS 中更常见的显式不可变更新习惯。

### 7. 把本地应用源码放在 `src/node_modules/@sudoku/*` 不符合 JS 生态常见约定

- 严重程度：minor
- 位置：src/node_modules/@sudoku/game.js:1-56, src/node_modules/@sudoku/stores/grid.js:1-137
- 原因：这里的 `@sudoku/*` 实际上是项目自身源码，而不是外部依赖。把领域/应用代码伪装成 `node_modules` 风格包会模糊源码归属、增加阅读成本，也让“领域层在哪里”这个问题更加不清楚。

## 优点

### 1. 题面与玩家输入被分成两份状态

- 位置：src/node_modules/@sudoku/stores/grid.js:7-18, src/node_modules/@sudoku/stores/grid.js:44-68, src/components/Board/index.svelte:48-51
- 原因：`grid` 保存初始题面，`userGrid` 保存当前作答结果，棋盘渲染再用 `$grid[y][x] === 0` 区分用户填写与给定格。这至少建立了一个清晰的业务分层，比把所有内容都塞进单一二维数组更容易支撑只读题面和用户高亮。

### 2. 校验和胜利判断被集中成派生状态

- 位置：src/node_modules/@sudoku/stores/grid.js:93-137, src/node_modules/@sudoku/stores/game.js:7-20, src/App.svelte:12-17
- 原因：`invalidCells` 与 `gameWon` 使用 derived store 统一产出，组件没有各自重复实现规则判断。对于 Svelte 3 来说，这种“由共享状态推导界面状态”的做法是合理的接入方式，也比把判断散落在多个组件事件里更整洁。

### 3. 开始游戏入口做了初步收口

- 位置：src/node_modules/@sudoku/game.js:13-33, src/components/Modal/Types/Welcome.svelte:16-24, src/components/Header/Dropdown.svelte:11-23, src/components/Header/Dropdown.svelte:41-55
- 原因：欢迎弹窗和下拉菜单都通过 `startNew` / `startCustom` 发起新局，而不是每个组件自己拼装初始化流程。虽然这还算不上合格的 `Game` 对象，但至少把“开始一局”这条流程做了共享入口。

### 4. 组件没有直接改模板中的二维数组，而是通过 store 方法写入

- 位置：src/components/Controls/Keyboard.svelte:10-25, src/components/Controls/ActionBar/Actions.svelte:13-20
- 原因：键盘输入和提示功能最终走的是 `userGrid.set` / `userGrid.applyHint`，而不是在组件里直接写 `$userGrid[y][x] = ...`。这说明作者至少意识到了要通过一层 API 进入状态变更，对 Svelte 接入来说比纯模板内直接 mutate 更稳。

## 补充说明

- 本次结论完全基于静态阅读，未运行测试，也未实际点击界面验证；关于“界面是否会刷新、流程是否能正常闭合”的判断，基于 Svelte store 语义和代码调用链推断。
- 仓库中未找到 `src/domain/*`，因此关于 OOP、OOD 与领域接入的判断，主要依据当前实际被组件消费的 `src/node_modules/@sudoku/*` 实现得出。
- 我刻意只审查了领域相关实现及其 Svelte 接入链路，没有扩展评论无关的 UI 视觉或其他目录。
