import { createContext, useCallback, useContext, useMemo, useState } from "react";
import QuoteModal from "../components/QuoteModal";

const QuoteContext = createContext({ openQuote: () => {}, closeQuote: () => {} });
export const useQuote = () => useContext(QuoteContext);

// The quote form opens ONLY when a visitor clicks a "Get a Quote" button.
// (The automatic popup on page load has been removed.)
export const QuoteProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const openQuote = useCallback(() => setOpen(true), []);
  const closeQuote = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openQuote, closeQuote }), [openQuote, closeQuote]);

  return (
    <QuoteContext.Provider value={value}>
      {children}
      {open && <QuoteModal onClose={closeQuote} />}
    </QuoteContext.Provider>
  );
};
