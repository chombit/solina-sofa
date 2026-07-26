import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ErrorContent = ({ onRefresh }: { onRefresh: () => void }) => {
  const { t } = useLanguage();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h2 className="text-2xl font-display font-bold text-foreground">{t("error.title")}</h2>
      <p className="text-muted-foreground max-w-md">{t("error.desc")}</p>
      <div className="flex gap-3">
        <Button variant="gold" onClick={onRefresh}>{t("error.refresh")}</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>{t("error.goHome")}</Button>
      </div>
    </div>
  );
};

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <ErrorContent onRefresh={() => window.location.reload()} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
