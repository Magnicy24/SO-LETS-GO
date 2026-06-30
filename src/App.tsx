import { Router, Route, Switch } from "wouter";
import LandingPage from "@/pages/LandingPage";
import DesignCasesPage from "@/pages/DesignCasesPage";
import AICasesPage from "@/pages/AICasesPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";

function App() {
  return (
    <Router base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/design" component={DesignCasesPage} />
        <Route path="/ai" component={AICasesPage} />
        <Route path="/privacy" component={PrivacyPolicyPage} />
        <Route path="/terms" component={TermsOfServicePage} />
      </Switch>
    </Router>
  );
}

export default App;
