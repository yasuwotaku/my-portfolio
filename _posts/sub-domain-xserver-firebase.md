---
title: " XServer Domain × Firebase Hostingでサイトを追加してサブドメインを設定する"
excerpt: "a"
coverImage:
    url: "/assets/album/DSC02616.JPG"
    alt: ""
date: "2025-03-15T22:29:07"
ogImage:
    url: "/assets/album/DSC02616.JPG"
tags:
    - "Tech"
---

先日、妻と共通の友達の３人で八景島シーパラダイスに行きました。水槽も大きいし、種類も多いし、デカいカピバラとすれ違えるし、爬虫類も居るし、生き物を目一杯楽しみました。アトラクションもたくさんあるので、誇張無しで１日中遊べます。

子どもの頃に行ったことはありましたが、その時の記憶はほとんど無く。唯一覚えていた"氷の国"は無くなってました。

さて、ちょうどイラストレーターをしている妻が自分のポートフォリオサイトを作りたいらしく、かつ私のサブドメインでもいいというので、とりあえずサブドメインを設定して公開するところまでやってみます。

## XServer Domain

このサイトのドメイン(yasuworks.com)はXServer Domainで管理しています。もともとRoute 53でドメインを管理していたんですが、料金が$で支払われるので為替レートを気にするのもなあという感じだし、ちょうどLightsailで動かしていたインスタンスが不要になってRoute 53以外にAWSを利用しなくなったので、これを期に国内では比較的安いXserver Domainに移管しました。

しかし、「XServer Domain サブドメイン 設定」みたいな検索をかけてみても、出てくるのはXServerのレンタルサーバーの利用者向けの方法しか出てこず。あんまりXServer Domainを単体で使っている人がいないのでしょうかね。もしくは、初歩的すぎるのか…。XServer DomainはUIがシンプルで、そこそこ安く、私のようなとりあえずドメインを持っておきたいくらいの人にはおすすめです。

## Firebase Hosting

このサイトはFirebase Hostingを使って公開しています。ある程度使ってもお金がかからないのでおすすめです。Firebase Hostingはひとつのプロジェクト内で複数のサイトを公開できます。

詳しくはこちら。

https://firebase.google.com/docs/hosting/multisites?hl=ja

今回はこちらの仕組みで、妻のポートフォリオ用のサイトを作ってみます。

## 設定手順

手順としてはかなり簡単です。

Firebase Hosting側でサイトを追加するところからスタートします。

### 1. Firebase Hostingでサイトを追加する

Firebaseの管理画面 > Hostingタブを開きます。
サイトが一つしかない状態では、デフォルトで最初のサイトの管理画面が画面の最下部に追加する導線がありますので、そこからサイトを追加します。

![](/assets/blog/sub-domain-xserver-firebase/firebase-append-site.png)

ここで設定する名前は何でも大丈夫だと思います。

### 2. カスタムドメインを追加する

先ほど追加したサイトに、カスタムドメインを設定します。

![](/assets/blog/sub-domain-xserver-firebase/firebase-append-domain.png)

こんな感じですね。
続行を押すと、セットアップ用の画面に遷移します。

![](/assets/blog/sub-domain-xserver-firebase/firebase-setting-domain.png)

ここからは XServer Domainの出番になります。

### 3. XServer DomainでDNSレコードを追加する。

XServer Domainの管理画面を開いたら、DNSレコード設定タブを開き、DNSレコードを追加する画面を開きます。

![](/assets/blog/sub-domain-xserver-firebase/xserver-dns-record.png)

あとは、Firebaseのセットアップ画面で要求されているレコードを追加していくだけで完了です。簡単！
XServer Domain側でDNSレコードを追加してから反映されるまでにそれなりに時間がかかるので、気長に待ちながら設定を進めます。

すべての確認がとれるとFirebase Hosting側で`設定が必要`みたいなマークが消えるので、実際に自分で設定したサブドメインからFirebaseの空の画面が開けたら完了です。

## 感想

ほぼ勘で進めてみたらできた、みたいな感じでしたが、結果としてなんとなく仕組みがわかりましたので、別のプロバイダに移管しても悩まず設定できそうです。

とりあえずサイトの置き場所ができたので、妻のサイトも並行して作っていきます。今のところ勉強することが多くて楽しいですね。また、妻がサイトにブログ機能をつけたくなったときにスマートに対応できるように、どこかのタイミングでヘッドレスCMSを試してみる編の記事を作ろうと思っています。やるぞ、やるぞ〜。
