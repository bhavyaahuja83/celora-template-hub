
from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import razorpay
import os
from typing import Optional, List, Dict, Any
import uuid
from datetime import datetime, timedelta
import json
from pydantic import BaseModel, EmailStr
import re

app = FastAPI(title="Celora Backend API", version="2.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure with your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Razorpay client
razorpay_client = razorpay.Client(auth=(
    os.getenv("RAZORPAY_KEY_ID", "your_key_id"),
    os.getenv("RAZORPAY_KEY_SECRET", "your_key_secret")
))

# Mock databases
templates_db = []
users_db = []
purchases_db = []
subscriptions_db = []
reviews_db = []
discounts_db = []
admin_settings = {
    "terms_of_service": "Default Terms of Service content...",
    "privacy_policy": "Default Privacy Policy content...",
    "seller_commission": 0.65,  # 65% to seller
    "minimum_template_price": 49,
    "daily_download_limits": {
        "free": 4,
        "starter": 50,
        "pro": 100,
        "enterprise": 200
    }
}

# Pydantic Models
class UserRegistration(BaseModel):
    email: EmailStr
    password: str
    name: str
    user_type: str  # buyer, seller, undecided
    mobile: Optional[str] = None

class SellerRegistration(BaseModel):
    email: EmailStr
    password: str
    name: str
    mobile: str
    pan_number: str
    address: str
    account_holder_name: str
    account_number: str
    ifsc_code: str

class TemplateUpload(BaseModel):
    title: str
    description: str
    price: int
    category: str
    tags: List[str]
    is_subscription_eligible: bool = True
    is_free: bool = False

class ReviewCreate(BaseModel):
    template_id: str
    rating: int  # 1-5
    comment: str

class DiscountCreate(BaseModel):
    percentage: int  # 30-55
    duration_hours: int
    template_ids: Optional[List[str]] = None  # If None, applies to all

# User and Template classes
class User:
    def __init__(self, id: str, email: str, name: str, user_type: str, **kwargs):
        self.id = id
        self.email = email
        self.name = name
        self.user_type = user_type  # buyer, seller, undecided
        self.plan = kwargs.get('plan', 'free')
        self.created_at = datetime.now()
        self.is_verified = kwargs.get('is_verified', False)
        self.mobile = kwargs.get('mobile')
        # Seller specific
        self.pan_number = kwargs.get('pan_number')
        self.address = kwargs.get('address')
        self.bank_details = kwargs.get('bank_details')
        self.is_seller_verified = kwargs.get('is_seller_verified', False)
        self.total_earnings = 0
        self.total_downloads = 0

class Template:
    def __init__(self, id: str, title: str, description: str, price: int, 
                 user_id: str, category: str, tags: List[str], **kwargs):
        self.id = id
        self.title = title
        self.description = description
        self.price = max(price, admin_settings["minimum_template_price"]) if price > 0 else 0
        self.user_id = user_id
        self.category = category
        self.tags = tags
        self.file_url = kwargs.get('file_url')
        self.thumbnail = kwargs.get('thumbnail')
        self.preview_images = kwargs.get('preview_images', [])
        self.status = kwargs.get('status', 'pending')  # pending, approved, rejected
        self.created_at = datetime.now()
        self.downloads = 0
        self.views = 0
        self.rating = 0.0
        self.reviews_count = 0
        self.is_trending = False
        self.is_featured = False
        self.is_subscription_eligible = kwargs.get('is_subscription_eligible', True)
        self.is_free = kwargs.get('is_free', False)
        self.estimated_time_saved = kwargs.get('estimated_time_saved', 4)  # hours
        self.estimated_roi = kwargs.get('estimated_roi', price * 10) if price > 0 else 0

# Helper functions
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    # Mock user validation - in production, validate JWT token
    return {"id": "user123", "email": "user@example.com", "name": "John Doe", "user_type": "seller"}

def validate_password(password: str) -> bool:
    """Validate password format: uppercase, number, symbol"""
    return (len(password) >= 8 and 
            re.search(r'[A-Z]', password) and 
            re.search(r'\d', password) and 
            re.search(r'[!@#$%^&*(),.?":{}|<>]', password))

def validate_mobile(mobile: str) -> bool:
    """Validate mobile with country code"""
    return re.match(r'^\+\d{1,4}\d{10}$', mobile) is not None

def validate_pan(pan: str) -> bool:
    """Validate Indian PAN format"""
    return re.match(r'^[A-Z]{5}[0-9]{4}[A-Z]{1}$', pan) is not None

def validate_ifsc(ifsc: str) -> bool:
    """Validate IFSC code format"""
    return re.match(r'^[A-Z]{4}0[A-Z0-9]{6}$', ifsc) is not None

# Auth endpoints
@app.post("/auth/register")
async def register_user(user_data: UserRegistration):
    """User registration endpoint"""
    # Validate password
    if not validate_password(user_data.password):
        raise HTTPException(
            status_code=400, 
            detail="Password must contain at least one uppercase letter, number, and symbol"
        )
    
    # Check if user exists
    existing_user = next((u for u in users_db if u.email == user_data.email), None)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Validate mobile if provided
    if user_data.mobile and not validate_mobile(user_data.mobile):
        raise HTTPException(status_code=400, detail="Invalid mobile number format")
    
    # Create new user
    user_id = str(uuid.uuid4())
    new_user = User(
        id=user_id,
        email=user_data.email,
        name=user_data.name,
        user_type=user_data.user_type,
        mobile=user_data.mobile
    )
    users_db.append(new_user)
    
    return {
        "success": True,
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "name": new_user.name,
            "user_type": new_user.user_type
        },
        "token": f"mock_token_{user_id}"
    }

@app.post("/auth/register-seller")
async def register_seller(seller_data: SellerRegistration):
    """Seller registration with complete verification details"""
    # Validate all inputs
    if not validate_password(seller_data.password):
        raise HTTPException(
            status_code=400, 
            detail="Password must contain at least one uppercase letter, number, and symbol"
        )
    
    if not validate_mobile(seller_data.mobile):
        raise HTTPException(status_code=400, detail="Invalid mobile number format")
    
    if not validate_pan(seller_data.pan_number):
        raise HTTPException(status_code=400, detail="Invalid PAN number format")
    
    if not validate_ifsc(seller_data.ifsc_code):
        raise HTTPException(status_code=400, detail="Invalid IFSC code format")
    
    # Check if user exists
    existing_user = next((u for u in users_db if u.email == seller_data.email), None)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Create seller user
    user_id = str(uuid.uuid4())
    bank_details = {
        "account_holder_name": seller_data.account_holder_name,
        "account_number": seller_data.account_number,
        "ifsc_code": seller_data.ifsc_code
    }
    
    new_seller = User(
        id=user_id,
        email=seller_data.email,
        name=seller_data.name,
        user_type="seller",
        mobile=seller_data.mobile,
        pan_number=seller_data.pan_number,
        address=seller_data.address,
        bank_details=bank_details
    )
    users_db.append(new_seller)
    
    return {
        "success": True,
        "message": "Seller registration successful. Verification pending.",
        "user": {
            "id": new_seller.id,
            "email": new_seller.email,
            "name": new_seller.name,
            "user_type": new_seller.user_type
        },
        "token": f"mock_token_{user_id}"
    }

@app.post("/auth/login")
async def login(email_or_mobile: str = Form(...), password: str = Form(...)):
    """Login with email or mobile"""
    # Find user by email or mobile
    user = None
    for u in users_db:
        if u.email == email_or_mobile or u.mobile == email_or_mobile:
            user = u
            break
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # In production, verify password hash
    if not validate_password(password):
        raise HTTPException(status_code=401, detail="Invalid password format")
    
    return {
        "success": True,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "user_type": user.user_type,
            "plan": user.plan
        },
        "token": f"mock_token_{user.id}"
    }

# Template endpoints
@app.post("/templates/upload")
async def upload_template(
    template_data: TemplateUpload,
    template_file: UploadFile = File(...),
    thumbnail: UploadFile = File(...),
    preview_images: List[UploadFile] = File([]),
    current_user: dict = Depends(get_current_user)
):
    """Upload a new template"""
    if current_user["user_type"] != "seller":
        raise HTTPException(status_code=403, detail="Only sellers can upload templates")
    
    # Validate minimum price
    if template_data.price > 0 and template_data.price < admin_settings["minimum_template_price"]:
        raise HTTPException(
            status_code=400, 
            detail=f"Minimum template price is ₹{admin_settings['minimum_template_price']}"
        )
    
    template_id = str(uuid.uuid4())
    file_url = f"/storage/templates/{template_id}/{template_file.filename}"
    thumbnail_url = f"/storage/thumbnails/{template_id}/{thumbnail.filename}"
    preview_urls = [f"/storage/previews/{template_id}/{img.filename}" for img in preview_images]
    
    new_template = Template(
        id=template_id,
        title=template_data.title,
        description=template_data.description,
        price=template_data.price,
        user_id=current_user["id"],
        category=template_data.category,
        tags=template_data.tags,
        file_url=file_url,
        thumbnail=thumbnail_url,
        preview_images=preview_urls,
        is_subscription_eligible=template_data.is_subscription_eligible,
        is_free=template_data.is_free
    )
    
    templates_db.append(new_template)
    
    return {
        "success": True,
        "template": {
            "id": new_template.id,
            "title": new_template.title,
            "status": new_template.status
        }
    }

@app.get("/templates")
async def get_templates(
    category: Optional[str] = None,
    is_free: Optional[bool] = None,
    is_trending: Optional[bool] = None,
    search: Optional[str] = None,
    limit: int = 20,
    offset: int = 0
):
    """Get templates with filtering"""
    filtered_templates = [t for t in templates_db if t.status == "approved"]
    
    if category:
        filtered_templates = [t for t in filtered_templates if t.category.lower() == category.lower()]
    
    if is_free is not None:
        filtered_templates = [t for t in filtered_templates if t.is_free == is_free]
    
    if is_trending:
        filtered_templates = [t for t in filtered_templates if t.is_trending]
    
    if search:
        search_lower = search.lower()
        filtered_templates = [
            t for t in filtered_templates 
            if search_lower in t.title.lower() or 
               search_lower in t.description.lower() or
               any(search_lower in tag.lower() for tag in t.tags)
        ]
    
    # Apply pagination
    paginated = filtered_templates[offset:offset + limit]
    
    return {
        "templates": [
            {
                "id": t.id,
                "title": t.title,
                "description": t.description,
                "price": t.price,
                "category": t.category,
                "tags": t.tags,
                "thumbnail": t.thumbnail,
                "downloads": t.downloads,
                "rating": t.rating,
                "is_free": t.is_free,
                "is_trending": t.is_trending,
                "estimated_time_saved": t.estimated_time_saved,
                "estimated_roi": t.estimated_roi,
                "created_at": t.created_at.isoformat()
            }
            for t in paginated
        ],
        "total": len(filtered_templates),
        "page": offset // limit + 1,
        "has_more": offset + limit < len(filtered_templates)
    }

# Payment endpoints
@app.post("/payment/create-order")
async def create_payment_order(
    template_id: str = Form(...),
    current_user: dict = Depends(get_current_user)
):
    """Create Razorpay order for template purchase"""
    template = next((t for t in templates_db if t.id == template_id), None)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    if template.is_free:
        raise HTTPException(status_code=400, detail="Cannot purchase free template")
    
    # Check for active discounts
    active_discount = None
    for discount in discounts_db:
        if (not discount.get("template_ids") or template_id in discount["template_ids"]) and \
           discount["expires_at"] > datetime.now():
            active_discount = discount
            break
    
    final_price = template.price
    if active_discount:
        final_price = int(template.price * (1 - active_discount["percentage"] / 100))
    
    order_data = {
        "amount": final_price * 100,  # Amount in paise
        "currency": "INR",
        "receipt": f"template_{template_id}_{current_user['id']}",
        "notes": {
            "template_id": template_id,
            "user_id": current_user["id"],
            "original_price": template.price,
            "final_price": final_price
        }
    }
    
    try:
        order = razorpay_client.order.create(data=order_data)
        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "template": {
                "id": template.id,
                "title": template.title,
                "price": final_price,
                "original_price": template.price if active_discount else None,
                "discount": active_discount["percentage"] if active_discount else None
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create order: {str(e)}")

# Subscription endpoints
@app.post("/subscription/create")
async def create_subscription(
    plan_id: str = Form(...),
    current_user: dict = Depends(get_current_user)
):
    """Create subscription for user"""
    plan_prices = {
        "starter": 1249,
        "pro": 2499,
        "enterprise": 5999
    }
    
    if plan_id not in plan_prices:
        raise HTTPException(status_code=400, detail="Invalid plan")
    
    order_data = {
        "amount": plan_prices[plan_id] * 100,
        "currency": "INR",
        "receipt": f"subscription_{plan_id}_{current_user['id']}",
        "notes": {
            "plan_id": plan_id,
            "user_id": current_user["id"],
            "type": "subscription"
        }
    }
    
    try:
        order = razorpay_client.order.create(data=order_data)
        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "plan": plan_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create subscription: {str(e)}")

# Admin endpoints (backend only - no UI)
@app.post("/admin/discount/create")
async def create_discount(discount_data: DiscountCreate):
    """Create promotional discount"""
    discount_id = str(uuid.uuid4())
    expires_at = datetime.now() + timedelta(hours=discount_data.duration_hours)
    
    discount = {
        "id": discount_id,
        "percentage": discount_data.percentage,
        "expires_at": expires_at,
        "template_ids": discount_data.template_ids,
        "created_at": datetime.now()
    }
    
    discounts_db.append(discount)
    
    return {
        "success": True,
        "discount": {
            "id": discount_id,
            "percentage": discount_data.percentage,
            "expires_at": expires_at.isoformat()
        }
    }

@app.get("/admin/analytics")
async def get_admin_analytics():
    """Get admin analytics"""
    total_users = len(users_db)
    total_templates = len(templates_db)
    total_sellers = len([u for u in users_db if u.user_type == "seller"])
    total_revenue = sum(p.get("amount", 0) for p in purchases_db)
    
    return {
        "total_users": total_users,
        "total_templates": total_templates,
        "total_sellers": total_sellers,
        "total_revenue": total_revenue,
        "pending_templates": len([t for t in templates_db if t.status == "pending"]),
        "active_discounts": len([d for d in discounts_db if d["expires_at"] > datetime.now()])
    }

@app.put("/admin/settings/update")
async def update_admin_settings(key: str, value: str):
    """Update admin settings"""
    if key in admin_settings:
        admin_settings[key] = value
        return {"success": True, "message": f"Updated {key}"}
    else:
        raise HTTPException(status_code=400, detail="Invalid setting key")

# Review endpoints
@app.post("/reviews/create")
async def create_review(
    review_data: ReviewCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create template review"""
    template = next((t for t in templates_db if t.id == review_data.template_id), None)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    review_id = str(uuid.uuid4())
    review = {
        "id": review_id,
        "template_id": review_data.template_id,
        "user_id": current_user["id"],
        "rating": review_data.rating,
        "comment": review_data.comment,
        "created_at": datetime.now()
    }
    
    reviews_db.append(review)
    
    # Update template rating
    template_reviews = [r for r in reviews_db if r["template_id"] == review_data.template_id]
    avg_rating = sum(r["rating"] for r in template_reviews) / len(template_reviews)
    template.rating = round(avg_rating, 1)
    template.reviews_count = len(template_reviews)
    
    return {"success": True, "review_id": review_id}

# Dashboard endpoints
@app.get("/dashboard/seller")
async def get_seller_dashboard(current_user: dict = Depends(get_current_user)):
    """Get seller dashboard data"""
    if current_user["user_type"] != "seller":
        raise HTTPException(status_code=403, detail="Access denied")
    
    user_templates = [t for t in templates_db if t.user_id == current_user["id"]]
    user_purchases = [p for p in purchases_db if any(t.id == p.get("template_id") and t.user_id == current_user["id"] for t in templates_db)]
    
    total_earnings = sum(p.get("amount", 0) * admin_settings["seller_commission"] for p in user_purchases)
    total_downloads = sum(t.downloads for t in user_templates)
    total_views = sum(t.views for t in user_templates)
    
    return {
        "total_earnings": total_earnings,
        "total_downloads": total_downloads,
        "total_templates": len(user_templates),
        "total_views": total_views,
        "templates": [
            {
                "id": t.id,
                "title": t.title,
                "downloads": t.downloads,
                "views": t.views,
                "rating": t.rating,
                "status": t.status,
                "earnings": sum(p.get("amount", 0) * admin_settings["seller_commission"] 
                              for p in user_purchases if p.get("template_id") == t.id)
            }
            for t in user_templates
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
