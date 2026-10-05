import { Check, X } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideToast } from "../redux/Slice/toastSlice";

const PopupToast = ({ success, message }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideToast());
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="absolute top-5 left-1/2 z-[9999] -translate-x-1/2">
      <div className="flex min-w-[280px] items-center gap-3 rounded-xl border border-white/10 bg-[#111111] px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff5a1f]">
          {success ? (
            <Check size={17} strokeWidth={2.5} className="text-white" />
          ) : (
            <X size={17} strokeWidth={2.5} className="text-white" />
          )}
        </div>

        <p className="text-sm font-medium text-white">
          {message}
        </p>
      </div>
    </div>
  );
};

export default PopupToast;