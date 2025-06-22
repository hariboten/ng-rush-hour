## GameService 設計

本サービスは Rush Hour ゲームの状態管理を担う Angular サービスであり、
`GameState` の変更をアプリ全体へ通知する役割を持つ。

### 1. 目的

* ゲーム状態を一元的に保持し、コンポーネント間で共有する
* 移動処理や勝利判定などドメインロジックを提供する
* UNDO やレベル読込など拡張機能の基盤となる

### 2. データモデル

`GameState` および `Move` の定義は [docs/design.md](../design.md) を参照。
内部では Angular の **Signals**（例: `signal<GameState>`）を用いて最新状態を保持する。

### 3. 公開 API

| メソッド                     | 説明 |
|-----------------------------|------|
| `state`: `Signal<GameState>` | 現在のゲーム状態を参照できるシグナル |
| `initialize(state: GameState): void` | 初期状態を設定し `state` を更新 |
| `move(move: Move): void`      | `isMoveLegal` で検証後 `applyMove` を適用 |
| `undo(): void`                | 直前の手を巻き戻し状態を更新 |
| `reset(): void`               | 初期状態へリセット |
| `isCleared`: `Signal<boolean>` | 勝利状態をシグナルとして公開 |

### 4. 実装方針

1. 純粋関数 `isMoveLegal`・`applyMove` 等を `GameService` から呼び出す
2. 状態は不変データとして扱い、更新時は新しいオブジェクトを生成
3. Signals で状態を保持し、コンポーネントは `state` を参照
4. `undo` は `GameState.history` を参照して前状態を復元

### 5. 拡張ポイント

* レベルデータの JSON 取込 (`initialize` 前にロード)
* ヒント機能や最短手計算ロジックの追加
* クリア後のランキング送信

以上が `GameService` の基本設計である。実装時にはテスト容易性を考慮し、
主要なロジックをサービス外の関数として分離することを推奨する。
