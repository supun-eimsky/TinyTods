# TinyTods Admin Guide

## 1. Sign In

1. Open `/admin/login` on the deployed site.
2. Enter your admin email and password.
3. Use `/admin/signup` only when creating an approved administrator account and provide the configured signup code.
4. After signing in, open the dashboard to manage products and orders.

Keep admin credentials and the signup code private. Do not share them in screenshots, chat messages, or source files.

## 2. Manage Products

Open **Admin > Products**.

### Create a product

1. Select **Add Product**.
2. Complete the required fields:
   - Product name
   - Category
   - Current price
   - At least one image
   - Stock quantity
3. Add an optional original price only when it is higher than the current price.
4. Upload images with the image uploader, or enter image URLs one per line.
5. Add options using one option per line, for example:

   ```text
   Size: 0-3M, 3-6M, 6-12M
   Color: Sage, Cream, Sky Blue
   ```

6. Choose **New** or **Featured** when appropriate.
7. Select **Save Product**.

### Edit a product

1. Open the product list.
2. Select the edit action for the product.
3. Change the price, stock, details, images, or visibility flags.
4. Select **Save Product**.

Product stock and price changes are written to MySQL. The storefront and admin pages refresh their server data when revisited or when an open tab refreshes.

### Delete a product

Use the delete action from the product list and confirm the action. Existing order items keep their saved name, image, price, and quantity. The product reference may become empty after deletion.

## 3. Product Images

- Supported formats: JPEG, PNG, GIF, WebP, and AVIF.
- Maximum size: 10 MB per image.
- Uploaded images are stored in Cloudflare R2, not on the Worker filesystem.
- The upload route must return paths beginning with `/api/uploads/images/`.
- Do not delete an R2 image that is still referenced by a product.

If uploads fail, verify that the `IMAGES` R2 binding and the `tinytods-images` bucket exist in the deployed Worker configuration.

## 4. Manage Orders

Open **Admin > Orders**.

1. Select an order to view customer details and line items.
2. Review the item quantities, prices, address, and payment method.
3. Update the status using the order status control.
4. Select **Update Status**.

Available statuses:

- Pending
- Confirmed
- Out for Delivery
- Delivered
- Cancelled

Use **Cancelled** only when the order will not be fulfilled. Keep the order status accurate so the customer-facing confirmation and admin dashboard remain consistent.

## 5. Freshness and Production Behavior

Production uses Cloudflare Hyperdrive for MySQL access. Query caching is disabled on the production Hyperdrive configuration so product stock, prices, and order status are read directly from RDS after updates.

The frontend also refreshes open tabs periodically and when a tab becomes active. A manual browser refresh is still useful after deployment or when testing a change across separate sessions.

If an update is not visible:

1. Confirm the save request succeeded.
2. Refresh the page with a hard reload.
3. Check the admin list and the storefront product page separately.
4. Check Cloudflare Worker logs for database or binding errors.
5. Verify that the deployed Worker version contains the latest code.

## 6. Production Deployment Checklist

Before deploying:

1. Confirm the production database is reachable through Hyperdrive.
2. Confirm the Hyperdrive configuration has query caching disabled for read-after-write freshness.
3. Confirm the R2 bucket `tinytods-images` exists.
4. Confirm the `IMAGES` binding is present in `wrangler.jsonc`.
5. Run the build:

   ```powershell
   npx opennextjs-cloudflare build
   ```

6. Deploy:

   ```powershell
   npx opennextjs-cloudflare deploy
   ```

7. Test one product update, one order-status update, and one image upload after deployment.

## 7. Troubleshooting Reference

### Product update succeeds but the page is stale

Check that the deployed Hyperdrive configuration has caching disabled. Then verify the Worker deployment version and refresh the page.

### Image upload returns an error

Check R2 enablement, the `IMAGES` binding, bucket name, and Worker logs. Workers cannot persist uploads to `public/images` at runtime.

### Image URL returns 404

Confirm the object exists in the `tinytods-images` R2 bucket and that the saved product image path uses the correct object key.

### Build fails with corrupted `.next` type files

Run the build script again. The `prebuild` script removes `.next` before rebuilding. On Windows, stop active Next/OpenNext/Node processes if `.open-next/assets` is locked.
