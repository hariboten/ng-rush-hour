## 🎮 Rush Hour ルール仕様（実装向け）

### 1. 盤面

* **サイズ**: `boardSize = n`（標準は 6）
* **出口**:

  * 主役車（以降 **red car**）が脱出するための“ゲート”。
  * 通常は **右端中央**（`y = rowOfRedCar` で `x = n - 1` が空セル）
  * 決定的に 1 か所；レベル定義で変更可。
* **座標系**: 左上 (0, 0) が原点、右方向へ `+x`、下方向へ `+y`。

### 2. 車オブジェクト `Car`

| プロパティ         | 型              | 説明               |         |
| ------------- | -------------- | ---------------- | ------- |
| `id`          | `string`       | 一意 ID            |         |
| `isMain`      | `boolean`      | `true` = red car |         |
| `orientation` | \`'horizontal' | 'vertical'\`     | 移動方向は固定 |
| `length`      | \`2            | 3\`              | セル数     |
| `x`, `y`      | `number`       | 左上端セルの座標         |         |

> **不変条件**
>
> * 配置時に盤面外・重複セルがあってはならない。

### 3. 移動ルール

1. **選択された車のみが動く**（同時に二台は動かない）。
2. **進行方向は `orientation` と同じ軸**

   * horizontal → `left` / `right`、vertical → `up` / `down`。
3. **歩数**: 1 セル以上 *連続* で空いていれば何セルでも可。
4. **衝突判定**

   * 移動経路上のセルに

     * 他車が存在する
     * 盤面境界を越える
     * （red car 以外の場合）出口セルを跨ぐ
       → その手は不許可。
5. **状態遷移**

   * `applyMove(state, move)` は **新しい `GameState`** を返し不変性を維持。

### 4. 勝利条件

* `red car` の **右端セル** が `x = boardSize - 1` を越えた瞬間に `isCleared = true`。

  * 実装上は「右端セルが出口セルに重なったら勝利」でも可。

### 5. データモデル

```ts
export interface Move {
  carId: string;
  direction: 'left' | 'right' | 'up' | 'down';
  steps: number;          // 1 以上
}

export interface GameState {
  boardSize: number;
  cars: Car[];
  moveCount: number;
  isCleared: boolean;
  history: Move[];        // UNDO 用
}
```

### 6. 基本 API（サービス層で提供）

| 関数                                   | 説明                                                    |
| ------------------------------------ | ----------------------------------------------------- |
| `getOccupiedGrid(state): number[][]` | 盤面の `[y][x]` に車 ID または `null` を詰めた 2D 配列を返す（衝突判定高速化）。 |
| `isMoveLegal(state, move): boolean`  | 上記 3. のルール 3, 4 を判定。                                  |
| `applyMove(state, move): GameState`  | 合法手のみ受け入れ。`moveCount++`、`history.push(move)`。         |
| `undo(state): GameState`             | `history.pop()` を巻き戻す。                                |
| `isCleared(state): boolean`          | 4. の勝利判定。                                             |

### 7. 入出力インタラクション指針

* **ドラッグ**でも**ボタンクリック**でも最終的に `Move` が生成され `GameService` に渡る。
* 不合法手なら視覚的フィードバックのみ（状態更新しない）。
* クリア時は `isCleared` をサブスクライブしてダイアログ等を表示。

### 8. 拡張用フック

| 拡張      | 実装ヒント                          |
| ------- | ------------------------------ |
| レベル読込   | `GameState` を JSON で保存し初期化に渡す。 |
| ヒント     | BFS/A\* で最短手順を計算し 1 手提示。       |
| 手数ランキング | クリア時に `moveCount` を送信。         |

---

## ✅ 重要ポイントまとめ

* **盤面は n×n、出口は 1 か所。**
* **車は向き固定・長さ 2/3・重なり禁止。**
* **合法移動 = 軸方向に連続空セル分だけスライド。**
* **red car が出口セルに到達した瞬間勝利。**
* `isMoveLegal` と `applyMove` を純粋関数として切り出すとテスト容易。
* UNDO・ヒントは `history` スタックと探索アルゴリズムを追加すれば実装可。

公式ルール参考: ThinkFun “Rush Hour” ルールブック（PDF） — [https://www.thinkfun.com/products/rush-hour/](https://www.thinkfun.com/products/rush-hour/) (公式サイト経由で閲覧可)。
