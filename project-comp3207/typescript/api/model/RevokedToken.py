from marshmallow import Schema, fields

from typescript.api.utils.database import db

class RevokedToken(db.Model):
    __tablename__ = 'RevokedToken'
    id = db.Column(db.Integer, primary_key = True)
    jti = db.Column(db.String(255))
    
    def add(self):
        db.session.add(self)
        db.session.commit()
    
    @staticmethod
    def is_jti_blacklisted(jti):
        query = RevokedToken.query.filter_by(jti = jti).first()
        return bool(query)

class RevokedTokenSchema(Schema):
    id = fields.Integer()
    jwt = fields.Str()
