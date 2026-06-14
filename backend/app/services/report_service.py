from app.agents.report_agent import ReportAgent


class ReportService:
    def generate(self, analysis, overall_score):

        return ReportAgent().generate_report(analysis, overall_score)
