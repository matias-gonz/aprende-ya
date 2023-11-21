from typing import List, Optional

from sqlmodel import Session

from app.db.models import Wishlist
from app.wishlists import WishlistCreate, WishlistRead

class WishlistRepository:

    def __init__(self, session: Session):
        self.session: Session = session

    def add_to_wishlist(self, wishlist_data: WishlistCreate) -> WishlistRead:
        new_wishlist_item = Wishlist(**wishlist_data.dict())
        self.session.add(new_wishlist_item)
        self.session.commit()
        self.session.refresh(new_wishlist_item)
        return new_wishlist_item

    def get_all_for_user(self, user_id: int) -> List[WishlistRead]:
        return self.session.query(Wishlist).filter(Wishlist.user_id == user_id).all()

    def delete_from_wishlist(self, user_id: int, course_id: int) -> Optional[WishlistRead]:
        wishlist_item = self.session.query(Wishlist).filter(
            Wishlist.user_id == user_id,
            Wishlist.course_id == course_id
        ).first()

        if wishlist_item:
            self.session.delete(wishlist_item)
            self.session.commit()
            return WishlistRead.from_orm(wishlist_item)
        
        return None