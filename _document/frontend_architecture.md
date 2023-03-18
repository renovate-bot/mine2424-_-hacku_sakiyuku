# frontend で採用しているアーキテクチャについて

今回は、機能別にディレクトリを分けたドメイン駆動設計を採用しています。

## 文脈、背景や問題点の説明

このプロダクトは業務 SaaS であり、ICT 教材でもあるため品質の高いものが必要とされている。
なので、コード由来の無駄なバグを減らすために負担は大きいが、ドメイン駆動設計を採用しています。

## それぞれに役割を簡単に解説

### `pages`

Next.js のルーティングに関わるページを配置します。

### `lib`

本プロジェクト内で使用する設定ファイル(定数やテーマ等)を配置します。

### `application`

アプリケーション内で共通して使う Domain を配置します。(Common のようなもの)
なので、features 内の Domain と同様です。
ただし、何でもかんでもここに置くのではなく、必要に応じて features 内に配置することを推奨します。

### `features`

機能ごとにディレクトリを分けて、その機能に関わる Domain を配置します。

### `Domain`

ドメインに依存するものを集約しています。

### `Entities`

- `entity`
  valueObject とは違い、識別子を持つ
  例えば、`User` は `id` を持つ
  また、`User` は `name` を持つ
  このように、`id` と `name` は `User` に依存する
  いわゆるデータモデルと言われる部分である。
  また、この `entity` に制約を持たせるためのロジックは `entity` に持たせる。
- `factory`
  `entity` を生成するための関数

### `ValueObjects`

`entity` とは違い、識別子を持たない
いわゆるそのドメイン特有の型を持つというようなイメージである。
また、この `ValueObject` に制約を持たせるためのロジックは `ValueObject` に持たせる。
ex) validation や format など

### `Repositories`

主に、`entity` と `ValueObject` を永続化するためのインターフェースを定義する。
具体的には、DB や API などの永続化先に依存する。
逆にそれ以外のロジックは入ってはならない。

### `DomainServices`

`entity` と `ValueObject` それぞれで表現できるものはここには書かない。
あくまで、`entity` と `ValueObject` それぞれの機能を組み合わせる必要がある場合や、
`repository`にて表現できないが必要なロジックを書く。(型の変換等)

### `ApplicationDomain`

`Domain` とは違い、アプリケーションに共通して使用するものを集約しています。
どのドメインに対しても共通して使うものしか受け付けません。

### `ApplicationServices`

`DomainService` とは違い、複数のドメインを組み合わせて、アプリケーションの機能を実現するものを集約しています。
いわゆる `useCase` と言われる部分である。

### `Hook`

プレゼンテーション層を支えるコントローラー的役割で、 custom hook や state を配置します。
主には`recoil`を使用するので、`recoil`の`atom`や`selector`を配置する領域となる。

- hook
  - 命名は `useXXX` とする

ex) `useUser`の例

```ts
export const useUser = () => {
  const [user, setUser] = useRecoilState(userState)

  const login = async (email: string, password: string) => {
    const user = await loginService(email, password)
    setUser(user)
  }

  const logout = async () => {
    await logoutService()
    setUser(null)
  }

  return { user, login, logout }
}
```

- state
  - 命名は `XXXState` とする
  - 固有のモデルを定義する場合は、state 内に定義する

ex) `userState`の例(モデルあり)

```ts
export const userState = atom<User | null>({
  key: 'userState',
  default: null,
})
```

ex) `userSettingState`の例(モデルなし)

```ts
export const userSettingState = atom({
  key: 'userSettingState',
  default: {
    isDarkMode: false,
  },
})

// or

export const userSettingState = atom<UserSetting>({
  key: 'userSettingState',
  default: {
    isDarkMode: false,
  },
})

type UserSetting = {
  isDarkMode: boolean
}
```

### `Tests`

Jest でテストを書く際に使用するディレクトリです。
TODO: テストの書き方を書く

### `UI`

UI 関連のコンポーネントを配置します。

### `Components`

ドメインに関連したコンポーネントを配置します。

### `Screens`

画面に関連したコンポーネントを配置します。

### `Presentational`

プレゼンテーション層を支えるコンポーネントを配置します。
主に UI に依存するロジック(useState 等)はここに配置せずに、html と css 関連(mantine の styled)のみを配置する。

### `Container`

UI に関連するロジックを配置します。
ここから Presentational に渡すデータを作成する。
pages へはここから繋げることになる。

### `Styles`

(mantine のみ使用中の場合は使わない)
