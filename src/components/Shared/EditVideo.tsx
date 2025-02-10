import { DialogContent, DialogTitle } from "../ui/dialog";

const EditVideo = () => {
  return (
    <DialogContent className="bg-[#0d0d0d] border-none max-w-[700px] rounded-xl px-[30px]">
      <DialogTitle className="text-[22px] font-semibold">
        Edit Video Details
      </DialogTitle>

      <div className="mt-9">
        <form action="" className="flex flex-col gap-10">
          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="title"
              className="uppercase text-white/30 font-medium text-sm"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter your video title"
              className="bg-white/5 outline-none p-[14px] rounded-lg text-lg font-medium"
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="tags"
              className="uppercase text-white/30 font-medium text-sm"
            >
              Tags
            </label>
            <div className="flex gap-[10px] flex-wrap">
              <label
                htmlFor="comedy"
                className="flex items-center gap-[10px] px-3 py-4 bg-white/5 rounded-md"
              >
                <input type="radio" name="tags" id="comedy" />
                Comedy
              </label>
              <label
                htmlFor="adventure"
                className="flex items-center gap-[10px] px-3 py-4 bg-white/5 rounded-md"
              >
                <input type="radio" name="tags" id="adventure" />
                Adventure
              </label>
              <label
                htmlFor="fantasy"
                className="flex items-center gap-[10px] px-3 py-4 bg-white/5 rounded-md"
              >
                <input type="radio" name="tags" id="fantasy" />
                Fantasy
              </label>
              <label
                htmlFor="sci-fi"
                className="flex items-center gap-[10px] px-3 py-4 bg-white/5 rounded-md"
              >
                <input type="radio" name="tags" id="sci-fi" />
                Sci-Fi
              </label>
              <label
                htmlFor="Kids"
                className="flex items-center gap-[10px] px-3 py-4 bg-white/5 rounded-md"
              >
                <input type="radio" name="tags" id="Kids" />
                Kids
              </label>
              <label
                htmlFor="Action"
                className="flex items-center gap-[10px] px-3 py-4 bg-white/5 rounded-md cursor-pointer"
              >
                <input type="radio" name="tags" id="Action" />
                Action
              </label>

              <label
                htmlFor="Education"
                className="flex items-center gap-[10px] px-3 py-4 bg-white/5 rounded-md cursor-pointer"
              >
                <input type="radio" name="tags" id="Education" />
                Education
              </label>

              <label
                htmlFor="Animals"
                className="flex items-center gap-[10px] px-3 py-4 bg-white/5 rounded-md cursor-pointer"
              >
                <input type="radio" name="tags" id="Animals" />
                Animals
              </label>

              <label
                htmlFor="FairyTales"
                className="flex items-center gap-[10px] px-3 py-4 bg-white/5 rounded-md cursor-pointer"
              >
                <input type="radio" name="tags" id="FairyTales" />
                Fairy Tales
              </label>

              <label
                htmlFor="Superheroes"
                className="flex items-center gap-[10px] px-3 py-4 bg-white/5 rounded-md cursor-pointer"
              >
                <input type="radio" name="tags" id="Superheroes" />
                Superheroes
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="Description"
              className="uppercase text-white/30 font-medium text-sm"
            >
              Description
            </label>
            <textarea
              id="Description"
              placeholder="Enter your video description"
              className="bg-white/5 outline-none p-[14px] rounded-lg text-lg font-medium min-h-[150px]"
            />
          </div>

          <div className="flex w-full justify-center items-center">
            <button className="py-2 px-4 bg-primary text-black text-sm rounded transition-all duration-300 hover:scale-105">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
};

export default EditVideo;
