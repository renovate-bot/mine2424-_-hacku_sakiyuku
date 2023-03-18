# sakiyuku_frontend

## 導入手順

### Install pnpm

今回はパッケージ管理に pnpm を採用しています。

まだインストールしていない場合

```zsh
npm install -g pnpm

or

brew pnpm install
```

### Installing Dependencies

```zsh
pnpm install

or

pnpm i
```

### Startup Local

```zsh
pnpm dev
```

### start firebase emulator

```zsh
# みねから.envを要求してね！
# まだfirebase-toolsをインストールしていなかったらこれ実行
npm i -g firebase-tools

# if you save data in emulator
cd ./sakiyuku
sh tools/start_emulator_save_data.sh

# if not
cd ./sakiyuku
sh tools/start_emulator.sh
```

---

## firebase hosting 周りの補足

- '.html'をつけなくても、ex) ~/student.html -> ~/student でアクセスできる
  - firebase.json で cleanUrls を true にしているため
- github actions で PR と develop ごとにデプロイされる
  - PR の場合は、PR の番号が URL につく
  - develop の場合は、develop が URL につく
- 基本的に、owner 以外がデプロイすることはない
  - ただし、PR の場合は、PR が自動でデプロイされるので PR 作成者は何もしなくてもデプロイされる

---

## ディレクトリ構成

詳しい説明はこちらから

[frontend で採用しているアーキテクチャについて](../_document/frontend_architecture.md)

```
.
├── .storybook/　(Storybookの設定ファイル)
├── public/ (静的ファイル, デプロイされるファイル入れ)
├── out/ (デプロイされるファイル入れ)
├── src/　(主なソースコード)
│   ├── pages/ (Nextルーティング内のページ)
│   │   ├── ** (ドメインごと)
│   │   │   ├── **.tsx (ドメインに関わる集約ページ)
│   │   ├── _app.tsx (全ページ共通の処理)
│   │   └── _document.tsx (全ページ共通の処理)
│   ├── lib/ (いろんなところで使う関数や定数のまとまり)
│   │   ├── constants.ts (定数)
│   │   └── heplers.ts (静的なヘルパー関数)
│   ├── application/ (アプリケーション内で共通して使うもの)
│   │   ├── ApplicationDomain/ (アプリケーションドメイン層)　
│   │   │   ├── Entities/ (エンティティ)
│   │   │   │   ├── **Entity.ts
│   │   │   │   ├── **Factory.ts
│   │   │   ├── ValueObjects/ (値オブジェクト)
│   │   │   │   ├── **ValObj.ts
│   │   │   ├── Repositories/ (リポジトリ)
│   │   │   │   ├── **Repo.ts
│   │   │   ├── DomainServices/ (ドメインサービス)
│   │   │   │   ├── **DomainService.ts
│   │   ├── ApplicationServices/ (アプリケーションサービス)
│   │   │   ├── **ApplicationService.ts
│   │   ├── Hook/ (hooks(プレゼンテーション層を支えるコントローラー的役割))
│   │   │   ├── **State.ts
│   │   │   ├── use**.ts
│   │   ├── Tests/ (単体テスト)
│   │   │   ├── **.test.ts
│   │   ├── UI/ (UI層)
│   │   │   ├── Components/ (コンポーネント, ページの一部)
│   │   │   ├── Screens/ (ページ)
│   │   │   │   ├── Presentational/ (表示のみ)
│   │   │   │   │   ├── **Pre.tsx
│   │   │   │   ├── Container/ (表示とロジック)
│   │   │   │   │   ├── **Con.tsx
│   │   └───└───└── Styles/ (スタイル)(mantineのみ使用中の場合は使わない)
│   ├── features/ (機能ごと)
│   │   ├── ** (ドメインごと)
│   │   │   ├── Domain/ (ドメイン層)　
│   │   │   │   ├── Entities/ (エンティティ)
│   │   │   │   │   ├── **Entity.ts
│   │   │   │   │   ├── **Factory.ts
│   │   │   │   ├── ValueObjects/ (値オブジェクト)
│   │   │   │   │   ├── **ValObj.ts
│   │   │   │   ├── Repositories/ (リポジトリ)
│   │   │   │   │   ├── **Repo.ts
│   │   │   │   ├── DomainServices/ (ドメインサービス)
│   │   │   │   │   ├── **DomSerivce.ts
│   │   │   ├── ApplicationServices/ (アプリケーションサービス)
│   │   │   │   ├── **ApplicationService.ts
│   │   │   ├── Hook/ (hooks(プレゼンテーション層を支えるコントローラー的役割))
│   │   │   │   ├── **State.ts
│   │   │   │   ├── use**.ts
│   │   │   ├── Tests/ (単体テスト)
│   │   │   │   ├── **.test.ts
│   │   │   ├── UI/ (UI層)
│   │   │   │   ├── Components/ (コンポーネント, ページの一部)
│   │   │   │   ├── Screens/ (ページ)
│   │   │   │   │   ├── Presentational/ (表示のみ)
│   │   │   │   │   │   ├── **Pre.tsx
│   │   │   │   │   ├── Container/ (表示とロジック)
│   │   │   │   │   │   ├── **Con.tsx
│   │   │   │   │   └── Styles/ (スタイル)(mantineのみ使用中の場合は使わない)
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierignore
├── .prettierrc.js
├── next-env.d.ts
├── next.config.js
├── package.json
├── README.md
├── tsconfig.json
...


```

---

## Pages 内のテンプレート

```tsx
// ex) pages/xxx/xxx.tsx等で使用できるテンプレート
export default function IndexPage() {
  return (
    <>
      <h1>Index page</h1>
      {/* TODO: ここに記述してね */}
    </>
  );
}
```

## Components 内のテンプレート

```tsx
// ex) pages/xxx/xxx.tsx等で使用できるテンプレート
export const testComponent = () => {
  return (
    <>
      <h1>Index page</h1>
      {/* TODO: ここに記述してね */}
    </>
  );
};
```

**できる限り、pages と component は、メモ化を意識しよう**

- React.memo -> コンポーネントの最適化 (props がなければ再レンダリングされない)
- useCallBack -> 関数自体の最適化 (関数が処理を行わなければ再レンダリングされない)
- useMemo -> 関数の結果に対して最適化 (結果が変われなければ再レンダリングされない)

### eslint の方針

`useMemo`と`React.memo`は、積極的に採用する。
`useCallback`は、本当に必要と感じた際に採用する。（採用前後で比較して圧倒的に違うなど）

参考 URL
https://qiita.com/seira/items/9e38204758030cd5442a

---

## 開発ルール

**prefix 一覧**

```
feat: 新しい機能
fix: バグの修正
docs: ドキュメントのみの変更
style: 空白、フォーマット、セミコロン追加など
refactor: 仕様に影響がないコード改善(リファクタ)
perf: パフォーマンス向上関連
test: テスト関連
chore: ビルド、補助ツール、ライブラリ関連
```

### ブランチ名

```
ex) feat/xxx_xxx
```

### コミットメッセージ

[コミットメッセージに関する参考記事](https://qiita.com/konatsu_p/items/dfe199ebe3a7d2010b3e)

**一例**

```
ex) feat: 〇〇なため、△△を追加
```

---
