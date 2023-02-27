
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QrCode({url}){
  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={128}
      bgColor={"rgb(211 211 211 / 71%)"}
      level={"H"}
    />
  );
  return (
    <div className="qrcode__container">
      <div>{qrcode}</div>
    </div>
  );
};

export default QrCode;