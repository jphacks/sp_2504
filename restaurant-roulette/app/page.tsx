'use client';

export default function Home() {

  //テスト用関数
  const onClickFetch = async () => {
    const res = await fetch('api/hotpepper');
    const json = await res.json()
    console.log(json)
  }

  return (
    <div><button onClick={onClickFetch}>ここをクリックしたら取得</button></div>
  );
}
