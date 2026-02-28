import { motion } from "framer-motion";

interface OverviewProps {
  append: (message: { role: "user"; content: string }) => void;
}

export const Overview = ({ append }: OverviewProps) => {
  return (
    <motion.div
      key="overview"
      className="max-w-[500px] mt-4 mx-4 md:mx-0"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="border-none bg-muted/50 rounded-2xl p-4 flex flex-col gap-3 text-zinc-500 text-sm dark:text-zinc-400">
        <p className="text-zinc-900 dark:text-zinc-50 font-medium">
          How can I help you today?
        </p>
        <div className="flex flex-col gap-2">
          <button
            className="text-left px-3 py-2 rounded-xl bg-background border border-border hover:bg-muted transition text-sm"
            onClick={() => append({ role: "user", content: "Find trails nearby" })}
          >
            Find trails nearby
          </button>
          <button
            className="text-left px-3 py-2 rounded-xl bg-background border border-border hover:bg-muted transition text-sm"
            onClick={() => append({ role: "user", content: "Run a drill" })}
          >
            Run a drill
          </button>
        </div>
      </div>
    </motion.div>
  );
};
