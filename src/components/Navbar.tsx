import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <div className="h-14 w-full flex items-center justify-center">
      <div className="px-8 flex justify-between items-center w-full max-w-3xl">
        <p className="font-bold">LOGO</p>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
