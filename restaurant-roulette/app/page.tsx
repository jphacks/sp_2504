'use client';

export default function Home() {

  //テスト用関数
  const onClickFetch = async () => {
    const res = await fetch('api/hotpepper?lat=43.07&lng=141.34&range=5&genre=G001&budget=B001');
    const json = await res.json()
    console.log(json)
  }

  return (
    <div><button onClick={onClickFetch}>ここをクリックしたら取得</button></div>
  );
}
