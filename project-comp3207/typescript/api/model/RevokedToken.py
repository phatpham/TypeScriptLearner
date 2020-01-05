from marshmallow import Schema, fields

from api.utils.database import db

class RevokedToken(db.Model):
    __tablename__ = 'revoked_tokens'
    id = db.Column(db.Integer, primary_key = True)
    jti = db.Column(db.String(255))
    
    def add(self):
        db.session.add(self)
        db.session.commit()
    
    @staticmethod
    def is_jti_blacklisted(self, jti):
        query = RevokedToken.query.filter_by(jti = jti).first()
        return bool(query)

class RevokedTokenSchema(Schema):
    id = fields.Integer()
    jwt = fields.Str()
