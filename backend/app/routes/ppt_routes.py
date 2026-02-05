from fastapi import APIRouter
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from app.services.ppt_service import generate_report_ppt

router = APIRouter()

class PPTRequest(BaseModel):
    report: dict

@router.post("/download-ppt")
def download_ppt(payload: PPTRequest):
    ppt_buffer = generate_report_ppt(payload.report)

    return StreamingResponse(
        ppt_buffer,
        media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
        headers={
            "Content-Disposition": "attachment; filename=Charge_Analysis_Report.pptx"
        }
    )