import React from 'react';
import DateTimeRangeInput from './DateTimeRangeInput';
import { request_cid, request_metadata } from "./network/hashmanager";
import { download_from_ipfs } from "./network/ipfs";

function App() {
  const handleDateTimeSubmit = async ({ startDate, endDate, setImgF }: { startDate: string, endDate: string, setImgF: any }) => {

    const hashes = await request_cid("date", 4, startDate, endDate)
    for (let hash of hashes) {
      console.log(`HASH: ${hash}`)
      const base64 = await download_from_ipfs(hash)

      setImgF(`data:image/png;base64,${base64}`)

      const metadata = await request_metadata(hash)

      console.log(metadata)
    }
  };

  return (
    <div className="App">
      <h1>CLIENT</h1>
      <DateTimeRangeInput onDateTimeSubmit={handleDateTimeSubmit} />
    </div>
  );
}

export default App;
