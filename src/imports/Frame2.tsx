import imgLeapScholarIconJpeg from "../assets/f079d52ef0cbd818e41ad86ed76b474839709c68.png";

export default function Frame() {
  return (
    <div className="overflow-clip relative rounded-[999px] size-full">
      <div className="absolute left-0 size-[300px] top-0" data-name="leap_scholar_icon.jpeg">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgLeapScholarIconJpeg} />
      </div>
    </div>
  );
}