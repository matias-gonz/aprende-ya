from sqlmodel import Session, select

from app.db.models import Certificate


class CertificateRepository:
    def __init__(self, session: Session):
        self.session: Session = session

    def get_certificates_by_user_id(self, user_id):
        statement = select(Certificate).where(Certificate.user_id == user_id)
        certificates = self.session.exec(statement)
        return list(map(lambda certificate: certificate.to_read_model(), certificates))

    def create(self, user_id, course_id, hash):
        certificate = Certificate(user_id=user_id, course_id=course_id, hash=hash)
        self.session.add(certificate)
        self.session.commit()

        return certificate.to_read_model()
